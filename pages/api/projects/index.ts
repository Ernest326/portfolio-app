import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('portfolio');

  if (req.method === 'GET') {
    const projects = await db.collection('projects').find().toArray();
    res.status(200).json(projects);
  } else if (req.method === 'POST') {
    const { title, slug, content, images = [], description } = req.body;
    const newProject = { title, slug, content, images, description, createdAt: new Date() };
    await db.collection('projects').insertOne(newProject);
    res.status(201).json({ message: 'Project created' });
  } else {
    res.status(405).end();
  }
}