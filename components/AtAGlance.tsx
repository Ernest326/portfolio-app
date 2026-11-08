import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import { cardSx, metaTextSx } from '@/lib/ui';

export default function AtAGlance({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <Box component="aside" aria-labelledby="glance-heading" sx={{ ...cardSx, p: { xs: 2.5, md: 3 } }}>
      <Typography id="glance-heading" variant="overline" component="h2" color="textSecondary">
        At a glance
      </Typography>
      <Box
        component="dl"
        sx={{ m: 0, mt: 2, display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', columnGap: 3, rowGap: 1.5 }}
      >
        {items.map((item) => (
          <Fragment key={item.label}>
            <Typography component="dt" sx={{ ...metaTextSx, lineHeight: 1.65, whiteSpace: 'nowrap' }}>
              {item.label}
            </Typography>
            <Typography component="dd" variant="body2" sx={{ m: 0 }}>
              {item.value}
            </Typography>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
}
