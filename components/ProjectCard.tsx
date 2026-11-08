import NextLink from 'next/link';
import { Box, Stack, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import ProjectCover from '@/components/ProjectCover';
import StatusLabel from '@/components/StatusLabel';
import TagList from '@/components/TagList';
import type { ProjectSummary } from '@/lib/types';
import { cardSx } from '@/lib/ui';

const linkCardSx = {
  ...cardSx,
  overflow: 'hidden',
  color: 'inherit',
  textDecoration: 'none',
  transition: 'border-color 150ms ease',
  '&:hover': { borderColor: 'text.secondary' },
  '&:hover .project-card-title': { textDecoration: 'underline', textUnderlineOffset: '3px' },
};

const clampSx = (lines: number) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

interface ProjectCardProps {
  project: ProjectSummary;
  // "large" lets the cover grow to fill a card that spans several grid rows.
  size?: 'default' | 'large';
  sx?: SxProps<Theme>;
}

export default function ProjectCard({ project, size = 'default', sx }: ProjectCardProps) {
  const large = size === 'large';

  return (
    <Box
      component={NextLink}
      href={`/projects/${project.slug}`}
      sx={[{ ...linkCardSx, display: 'flex', flexDirection: 'column' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <ProjectCover
        project={project}
        sx={{ aspectRatio: '16 / 9', flexGrow: large ? 1 : 0, borderBottom: 1, borderColor: 'divider' }}
      />
      <Box sx={{ p: large ? { xs: 2.5, md: 3 } : 2.5, display: 'flex', flexDirection: 'column', gap: 1, flexGrow: large ? 0 : 1 }}>
        <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography className="project-card-title" variant={large ? 'h2' : 'subtitle1'} component="h3">
            {project.title}
          </Typography>
          <StatusLabel status={project.status} />
        </Stack>
        {project.description && (
          <Typography variant={large ? 'body1' : 'body2'} color="textSecondary" sx={clampSx(3)}>
            {project.description}
          </Typography>
        )}
        <TagList tags={project.tags} max={large ? undefined : 4} sx={{ mt: 'auto', pt: 1 }} />
      </Box>
    </Box>
  );
}

export function FeaturedProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Box
      component={NextLink}
      href={`/projects/${project.slug}`}
      sx={{
        ...linkCardSx,
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 7fr) minmax(0, 5fr)' },
      }}
    >
      <ProjectCover
        project={project}
        sx={{
          aspectRatio: { xs: '16 / 9', md: 'auto' },
          minHeight: { md: 320 },
          // Widths only: a responsive `border` shorthand would reset the colour inside the media query.
          borderStyle: 'solid',
          borderColor: 'divider',
          borderWidth: 0,
          borderBottomWidth: { xs: 1, md: 0 },
          borderRightWidth: { xs: 0, md: 1 },
        }}
      />
      <Box sx={{ p: { xs: 2.5, md: 4 }, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="overline" color="textSecondary">
            Featured
          </Typography>
          <StatusLabel status={project.status} />
        </Stack>
        <Typography className="project-card-title" variant="h2" component="h3">
          {project.title}
        </Typography>
        {project.description && (
          <Typography variant="body1" color="textSecondary" sx={clampSx(5)}>
            {project.description}
          </Typography>
        )}
        <TagList tags={project.tags} sx={{ mt: 'auto', pt: 1 }} />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Read more →
        </Typography>
      </Box>
    </Box>
  );
}
