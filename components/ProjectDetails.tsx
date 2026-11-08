import { Box, Button, Stack, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import GitHub from '@mui/icons-material/GitHub';
import OpenInNew from '@mui/icons-material/OpenInNew';
import StatusLabel from '@/components/StatusLabel';
import TagList from '@/components/TagList';
import { formatDate } from '@/lib/format';
import type { Project } from '@/lib/types';
import { cardSx, metaTextSx } from '@/lib/ui';

interface ProjectDetailsProps {
  project: Project;
  githubUrl: string;
  sx?: SxProps<Theme>;
}

const external = { target: '_blank', rel: 'noopener noreferrer' };

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <Typography component="dt" sx={{ ...metaTextSx, lineHeight: 1.65 }}>
        {label}
      </Typography>
      <Typography component="dd" variant="body2" sx={{ m: 0 }}>
        {children}
      </Typography>
    </>
  );
}

export default function ProjectDetails({ project, githubUrl, sx }: ProjectDetailsProps) {
  const published = formatDate(project.createdAt);
  const updated = formatDate(project.updatedAt);
  const hasLinks = Boolean(githubUrl || project.liveUrl);

  return (
    <Box
      component="aside"
      aria-label="Project details"
      sx={[
        { ...cardSx, p: 2.5, position: { md: 'sticky' }, top: { md: 24 } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        component="dl"
        sx={{ m: 0, display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', columnGap: 2.5, rowGap: 1, alignItems: 'baseline' }}
      >
        {project.status && (
          <Row label="Status">
            <StatusLabel status={project.status} />
          </Row>
        )}
        {published && (
          <Row label="Date">
            <time dateTime={project.createdAt ?? undefined}>{published}</time>
          </Row>
        )}
        {updated && updated !== published && <Row label="Updated">{updated}</Row>}
      </Box>

      {project.tags.length > 0 && (
        <Box sx={{ mt: 2.5, pt: 2.5, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="overline" component="h2" color="textSecondary">
            Tech
          </Typography>
          <TagList tags={project.tags} linkTags pills sx={{ mt: 1 }} />
        </Box>
      )}

      {hasLinks && (
        <Stack spacing={1} sx={{ mt: 2.5 }}>
          {githubUrl && (
            <Button href={githubUrl} {...external} variant="outlined" fullWidth startIcon={<GitHub />}>
              View source
            </Button>
          )}
          {project.liveUrl && (
            <Button href={project.liveUrl} {...external} variant="contained" fullWidth startIcon={<OpenInNew />}>
              Live site
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
}
