import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('portfolio');

  if (req.method === 'GET') {
    const projects = await db.collection('projects').find().toArray();
    return res.status(200).json(projects);
  }

  if (req.method === 'POST') {
    const secret = req.headers['x-admin-secret'];

    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, slug, content, description, coverImage, status, tags } = req.body;
    const newProject = { title, slug, content, description, coverImage, status, tags, createdAt: new Date() };
    await db.collection('projects').insertOne(newProject);
    return res.status(201).json({ message: 'Project created' });
  }

  res.status(405).end();
}