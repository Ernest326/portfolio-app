import { Box } from '@mui/material';
import { monoFontFamily } from '@/lib/fonts';

const STATUS_COLORS: Record<string, string> = {
  Completed: '#10b981',
  'In Progress': '#f59e0b',
  Planned: '#6366f1',
  'On Hold': '#94a3b8',
  Dropped: '#f43f5e',
};

export default function StatusLabel({ status }: { status: string }) {
  if (!status) return null;

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        fontFamily: monoFontFamily,
        fontSize: '0.75rem',
        color: 'text.secondary',
      }}
    >
      <Box
        component="span"
        aria-hidden
        sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: STATUS_COLORS[status] ?? '#94a3b8' }}
      />
      {status}
    </Box>
  );
}
