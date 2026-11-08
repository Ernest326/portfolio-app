import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { isAdminRequest } from '@/lib/auth';
import { revalidatePaths } from '@/lib/revalidate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const settings = client.db('portfolio').collection<{ _id: string }>('settings');

  if (req.method === 'GET') {
    try {
      const doc = await settings.findOne({ _id: 'global' });
      if (!doc) return res.status(404).json({ message: 'Settings not found' });
      return res.status(200).json(doc);
    } catch (error) {
      console.error('Error fetching settings:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  if (req.method === 'PUT') {
    if (!isAdminRequest(req)) return res.status(401).json({ message: 'Unauthorized' });
    if (typeof req.body !== 'object' || req.body === null || Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Expected a JSON object' });
    }

    try {
      const updateData = { ...req.body };
      delete updateData._id;
      const result = await settings.updateOne({ _id: 'global' }, { $set: updateData });
      if (result.matchedCount === 0) return res.status(404).json({ message: 'Settings not found' });

      await revalidatePaths(res, ['/']);
      return res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
      console.error('Error updating settings:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
