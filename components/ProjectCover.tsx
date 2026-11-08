import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import SafeImage from '@/components/SafeImage';
import { monoFontFamily } from '@/lib/fonts';
import type { ProjectSummary } from '@/lib/types';

// Shows the cover image, or a deliberate-looking placeholder when there is none (or it fails to load).
export default function ProjectCover({ project, sx }: { project: ProjectSummary; sx?: SxProps<Theme> }) {
  return (
    <Box
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'action.hover',
          backgroundImage: 'radial-gradient(rgba(100, 116, 139, 0.28) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        aria-hidden
        sx={{ px: 3, textAlign: 'center', fontFamily: monoFontFamily, fontSize: '0.8125rem', color: 'text.secondary' }}
      >
        {project.title}
      </Typography>
      <SafeImage
        src={project.coverImage}
        alt=""
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          bgcolor: 'background.paper',
        }}
      />
    </Box>
  );
}
