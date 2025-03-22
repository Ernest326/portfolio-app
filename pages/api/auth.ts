import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body;
    if (token === process.env.ADMIN_SECRET) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}