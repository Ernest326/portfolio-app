import type { NextApiResponse } from 'next';

// Failures are logged rather than thrown so a stale cache never blocks a successful write.
export async function revalidatePaths(res: NextApiResponse, paths: string[]) {
  await Promise.all(
    [...new Set(paths)].map((path) =>
      res.revalidate(path).catch((error) => console.error(`Failed to revalidate ${path}:`, error)),
    ),
  );
}
