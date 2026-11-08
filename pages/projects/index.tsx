import { useMemo, useState } from 'react';
import type { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Chip, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import Search from '@mui/icons-material/Search';
import AdminCheck from '@/components/AdminCheck';
import ProjectList from '@/components/ProjectList';
import Seo from '@/components/Seo';
import { yearOf } from '@/lib/format';
import { getProjectSummaries } from '@/lib/projects';
import { PROJECT_STATUSES, type ProjectSummary } from '@/lib/types';
import { READING_MAX_WIDTH } from '@/lib/ui';

interface ProjectsPageProps {
  projects: ProjectSummary[];
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => ({
  props: { projects: await getProjectSummaries() },
  revalidate: 600,
});

function groupByYear(projects: ProjectSummary[]): Array<[string, ProjectSummary[]]> {
  const groups = new Map<string, ProjectSummary[]>();
  for (const project of projects) {
    const year = yearOf(project.createdAt);
    groups.set(year, [...(groups.get(year) ?? []), project]);
  }
  return [...groups.entries()];
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const tag = typeof router.query.tag === 'string' ? router.query.tag : null;

  const setTag = (next: string | null) => {
    router.replace({ pathname: '/projects', query: next ? { tag: next } : {} }, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const statusOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) counts.set(project.status, (counts.get(project.status) ?? 0) + 1);
    return [
      ['All', projects.length] as const,
      ...PROJECT_STATUSES.filter((value) => counts.has(value)).map((value) => [value, counts.get(value)!] as const),
    ];
  }, [projects]);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return projects.filter(
      (project) =>
        (status === 'All' || project.status === status) &&
        (!tag || project.tags.includes(tag)) &&
        (!needle ||
          [project.title, project.description, ...project.tags].some((value) => value.toLowerCase().includes(needle))),
    );
  }, [projects, search, status, tag]);

  return (
    <>
      <Seo
        title="Projects"
        description="Things I've built, from game engines and ray tracers to full-stack web apps."
        path="/projects"
      />
      <Box component="header" sx={{ mb: 5 }}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography variant="h1">Projects</Typography>
          <AdminCheck>
            <Button component={NextLink} href="/admin/create-post" nativeButton={false} variant="outlined" size="small">
              New project
            </Button>
          </AdminCheck>
        </Stack>
        <Typography color="textSecondary" sx={{ mt: 1.5, maxWidth: READING_MAX_WIDTH }}>
          Things I&apos;ve built over the years, from game engines and ray tracers to full-stack web apps. Newest first.
        </Typography>
      </Box>

      <Stack spacing={2} sx={{ mb: 7 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search by title, description or tag"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
            htmlInput: { 'aria-label': 'Search projects' },
          }}
        />
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {statusOptions.map(([value, count]) => (
            <Chip
              key={value}
              size="small"
              variant={status === value ? 'filled' : 'outlined'}
              aria-pressed={status === value}
              onClick={() => setStatus(value)}
              label={
                <>
                  {value}{' '}
                  <Box component="span" sx={{ opacity: 0.6 }}>
                    {count}
                  </Box>
                </>
              }
            />
          ))}
          {tag && <Chip size="small" color="primary" label={tag} onDelete={() => setTag(null)} />}
        </Stack>
      </Stack>

      {filtered.length > 0 ? (
        <ProjectList groups={groupByYear(filtered)} onTagClick={setTag} />
      ) : (
        <Typography color="textSecondary">No projects match those filters.</Typography>
      )}
    </>
  );
}
