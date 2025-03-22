import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('portfolio');
  const { slug } = req.query;

  if (req.method === 'GET') {
    const project = await db.collection('projects').findOne({ slug });
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(project);
  } else {
    res.status(405).end();
  }
}