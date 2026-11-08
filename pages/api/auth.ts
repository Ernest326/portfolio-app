import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidAdminToken } from '@/lib/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (isValidAdminToken(req.body?.token)) {
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Invalid token' });
}
