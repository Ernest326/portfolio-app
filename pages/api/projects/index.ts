import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { isAdminRequest } from '@/lib/auth';
import { pickProjectFields, projectFieldError } from '@/lib/projects';
import { revalidatePaths } from '@/lib/revalidate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const projects = client.db('portfolio').collection('projects');

  if (req.method === 'GET') {
    return res.status(200).json(await projects.find().toArray());
  }

  if (req.method === 'POST') {
    if (!isAdminRequest(req)) return res.status(401).json({ message: 'Unauthorized' });

    const fields = pickProjectFields(req.body);
    if (!fields.title || !fields.slug) {
      return res.status(400).json({ message: 'Title and slug are required' });
    }
    const fieldError = projectFieldError(fields);
    if (fieldError) return res.status(400).json({ message: fieldError });
    if (await projects.findOne({ slug: fields.slug }, { projection: { _id: 1 } })) {
      return res.status(409).json({ message: 'A project with this slug already exists' });
    }

    await projects.insertOne({ ...fields, createdAt: new Date() });
    await revalidatePaths(res, ['/', '/projects', `/projects/${fields.slug}`]);
    return res.status(201).json({ message: 'Project created' });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end();
}
