import { Box, Typography } from '@mui/material';
import type { SkillGroup } from '@/content/profile';
import { cardSx } from '@/lib/ui';

export default function SkillGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
        gap: 2,
      }}
    >
      {groups.map((group) => (
        <Box key={group.label} sx={{ ...cardSx, p: 2.5 }}>
          <Typography variant="overline" component="h3" color="textSecondary">
            {group.label}
          </Typography>
          <Box
            component="ul"
            sx={{ listStyle: 'none', m: 0, mt: 1.5, p: 0, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}
          >
            {group.items.map((item) => (
              <Box
                component="li"
                key={item}
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: 1.5,
                  border: 1,
                  borderColor: 'divider',
                  bgcolor: 'background.default',
                  fontSize: '0.8125rem',
                  lineHeight: 1.6,
                }}
              >
                {item}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
