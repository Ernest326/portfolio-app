import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('portfolio');

  if (req.method === 'GET') {
    try {
      const settings = await db.collection('settings').findOne({ _id: 'global' });
      if (!settings) return res.status(404).json({ message: 'Settings not found' });
      res.status(200).json(settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { ...updateData } = req.body;
      const result = await db.collection('settings').updateOne({ _id: "global" }, { $set: updateData });
      if (result.matchedCount === 0) return res.status(404).json({ message: 'Settings not found' });
      res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
      console.error('Error updating settings:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}