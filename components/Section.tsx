import { Box, Stack, Typography } from '@mui/material';

interface SectionProps {
  id: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export default function Section({ id, title, action, children }: SectionProps) {
  return (
    <Box component="section" id={id} aria-labelledby={`${id}-heading`} sx={{ scrollMarginTop: 24 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'baseline',
          mb: 3.5,
          pb: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography id={`${id}-heading`} variant="overline" component="h2" color="textSecondary">
          {title}
        </Typography>
        {action}
      </Stack>
      {children}
    </Box>
  );
}
