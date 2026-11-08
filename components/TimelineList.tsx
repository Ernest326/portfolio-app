import NextLink from 'next/link';
import { Box, Link, Typography } from '@mui/material';
import type { TimelineEntry } from '@/content/profile';
import { metaTextSx } from '@/lib/ui';

interface TimelineListProps {
  entries: TimelineEntry[];
  // "rail" draws a vertical line with a dot per entry; "stacked" is a plain list.
  variant?: 'rail' | 'stacked';
}

const RAIL_GAP_PX = 32;
const DOT_CENTER_PX = 10;

const railItemSx = {
  position: 'relative',
  pl: 4,
  // Line from this entry's dot down to the next entry's dot.
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 4,
    top: DOT_CENTER_PX,
    bottom: -(RAIL_GAP_PX + DOT_CENTER_PX),
    width: '1px',
    bgcolor: 'divider',
  },
  '&:last-of-type::before': { display: 'none' },
};

export default function TimelineList({ entries, variant = 'stacked' }: TimelineListProps) {
  const rail = variant === 'rail';

  return (
    <Box
      component="ol"
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        display: 'grid',
        rowGap: rail ? `${RAIL_GAP_PX}px` : 3,
      }}
    >
      {entries.map((entry, index) => (
        <Box component="li" key={`${entry.title}-${entry.period ?? ''}`} sx={rail ? railItemSx : undefined}>
          {rail && (
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                left: 0,
                top: DOT_CENTER_PX - 4.5,
                width: 9,
                height: 9,
                borderRadius: '50%',
                border: 2,
                borderColor: index === 0 ? 'text.primary' : 'text.disabled',
                bgcolor: index === 0 ? 'text.primary' : 'background.default',
              }}
            />
          )}
          {entry.period && (
            <Typography component="div" sx={{ ...metaTextSx, lineHeight: '20px' }}>
              {entry.period}
            </Typography>
          )}
          <Typography variant="subtitle1" component="h3" sx={{ mt: entry.period ? 0.25 : 0, lineHeight: 1.5 }}>
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
            {entry.subtitle && (
              <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                {' '}
                · {entry.subtitle}
              </Box>
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
