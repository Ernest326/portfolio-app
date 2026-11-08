import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { isAdminRequest } from '@/lib/auth';
import { pickProjectFields, projectFieldError } from '@/lib/projects';
import { revalidatePaths } from '@/lib/revalidate';

// GET looks projects up by slug; PUT and DELETE address them by ObjectId (same dynamic segment).
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const projects = client.db('portfolio').collection('projects');
  const param = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug;
  if (!param) return res.status(400).json({ message: 'Missing project identifier' });

  if (req.method === 'GET') {
    const project = await projects.findOne({ slug: param });
    if (!project) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(project);
  }

  if (req.method !== 'PUT' && req.method !== 'DELETE') {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end();
  }

  if (!isAdminRequest(req)) return res.status(401).json({ message: 'Unauthorized' });
  if (!ObjectId.isValid(param)) return res.status(400).json({ message: 'Invalid project id' });
  const _id = new ObjectId(param);

  if (req.method === 'PUT') {
    const fields = pickProjectFields(req.body);
    const fieldError = projectFieldError(fields);
    if (fieldError) return res.status(400).json({ message: fieldError });

    const previous = await projects.findOneAndUpdate(
      { _id },
      { $set: { ...fields, updatedAt: new Date() } },
      { returnDocument: 'before' },
    );
    if (!previous) return res.status(404).json({ message: 'Project not found' });

    await revalidatePaths(res, ['/', '/projects', `/projects/${previous.slug}`, `/projects/${fields.slug ?? previous.slug}`]);
    return res.status(200).json({ message: 'Updated successfully' });
  }

  const deleted = await projects.findOneAndDelete({ _id });
  if (!deleted) return res.status(404).json({ message: 'Project not found' });

  await revalidatePaths(res, ['/', '/projects', `/projects/${deleted.slug}`]);
  return res.status(200).json({ message: 'Deleted successfully' });
}
