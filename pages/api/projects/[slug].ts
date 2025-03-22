import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('portfolio');
  const { slug } = req.query;

  if (req.method === 'GET') {
    const project = await db.collection('projects').findOne({ slug });
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(project);

  } else if (req.method === 'PUT') {
      const result = await db.collection('projects').updateOne({_id: new ObjectId(slug as string)},{
          $set: { ...req.body, updatedAt: new Date() }
      });
      if(result.matchedCount === 0) return res.status(404).json({ message: 'Project not found' });
      res.status(200).json({ message: 'Updated successfully' });
      
    } else if (req.method === 'DELETE') {
        const result = await db.collection('projects').deleteOne({_id: new ObjectId(slug as string)});
        if(result.deletedCount === 0) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } else {
    res.status(405).end();
  }
}