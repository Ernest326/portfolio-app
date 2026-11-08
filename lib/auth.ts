import { createHash, timingSafeEqual } from 'node:crypto';
import type { NextApiRequest } from 'next';

const digest = (value: string) => createHash('sha256').update(value).digest();

export function isValidAdminToken(token: unknown): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || typeof token !== 'string' || !token) return false;
  return timingSafeEqual(digest(token), digest(secret));
}

export function isAdminRequest(req: NextApiRequest): boolean {
  return isValidAdminToken(req.headers['x-admin-secret']);
}
