import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json("dh=0ee0bb7b989b60b42cd3787a49519e0d4a1a59f6");
  }
  return res.status(405).end();
}