import NextLink from 'next/link';
import { Box, Link, Typography } from '@mui/material';
import type { TimelineEntry } from '@/content/profile';
import { cardSx, metaTextSx } from '@/lib/ui';

// Renders timeline-style entries as a responsive grid of small cards.
export default function EntryCards({ entries }: { entries: TimelineEntry[] }) {
  // In the 3-column layout, widen the first card when that makes the last row come out full.
  const widenFirst = entries.length % 3 === 2;

  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
        gap: 2,
      }}
    >
      {entries.map((entry, index) => (
        <Box
          component="li"
          key={`${entry.title}-${entry.period ?? ''}`}
          sx={{
            ...cardSx,
            p: 2.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            ...(widenFirst && index === 0 ? { gridColumn: { sm: 'span 2' } } : {}),
          }}
        >
          <Typography component="div" sx={{ ...metaTextSx, lineHeight: '20px' }}>
            {[entry.period, entry.subtitle].filter(Boolean).join(' · ')}
          </Typography>
          <Typography variant="subtitle1" component="h3" sx={{ lineHeight: 1.4 }}>
            {entry.href ? (
              <Link
                component={NextLink}
                href={entry.href}
                underline="always"
                sx={{ textDecorationColor: 'rgba(100, 116, 139, 0.5)' }}
              >
                {entry.title}
              </Link>
            ) : (
              entry.title
            )}
          </Typography>
          {entry.summary && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              {entry.summary}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}
