import NextLink from 'next/link';
import { Box, Link, Stack, Typography } from '@mui/material';
import StatusLabel from '@/components/StatusLabel';
import TagList from '@/components/TagList';
import type { ProjectSummary } from '@/lib/types';
import { labelColumnSx, metaTextSx } from '@/lib/ui';

interface ProjectListProps {
  groups: Array<[string, ProjectSummary[]]>;
  onTagClick?: (tag: string) => void;
}

function ProjectRow({ project, onTagClick }: { project: ProjectSummary; onTagClick?: (tag: string) => void }) {
  return (
    <Box component="li" sx={{ position: 'relative' }}>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Link
          component={NextLink}
          href={`/projects/${project.slug}`}
          sx={{
            fontWeight: 600,
            lineHeight: 1.7,
            // Stretch the link over the whole row; tag buttons sit above it.
            '&::after': { content: '""', position: 'absolute', inset: 0 },
          }}
        >
          {project.title}
        </Link>
        <StatusLabel status={project.status} />
      </Stack>
      {project.description && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.25 }}>
          {project.description}
        </Typography>
      )}
      <TagList tags={project.tags} onTagClick={onTagClick} sx={{ mt: 0.75, position: 'relative', zIndex: 1, width: 'fit-content' }} />
    </Box>
  );
}

export default function ProjectList({ groups, onTagClick }: ProjectListProps) {
  return (
    <Stack spacing={{ xs: 5, sm: 6 }}>
      {groups.map(([year, projects]) => (
        <Box key={year} component="section" aria-labelledby={`year-${year}`} sx={{ ...labelColumnSx, rowGap: 1.5 }}>
          <Typography id={`year-${year}`} component="h2" sx={metaTextSx}>
            {year}
          </Typography>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 3.5 }}>
            {projects.map((project) => (
              <ProjectRow key={project._id} project={project} onTagClick={onTagClick} />
            ))}
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
