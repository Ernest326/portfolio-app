import type { GetStaticPaths, GetStaticProps } from 'next';
import NextLink from 'next/link';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import AdminCheck from '@/components/AdminCheck';
import MarkdownPreview from '@/components/MarkdownPreview';
import ProjectCard from '@/components/ProjectCard';
import ProjectDetails from '@/components/ProjectDetails';
import SafeImage from '@/components/SafeImage';
import Section from '@/components/Section';
import Seo from '@/components/Seo';
import { contentHasImage, excerpt, preparePostContent } from '@/lib/markdown';
import { getProjectBySlug, getProjectSummaries } from '@/lib/projects';
import { relatedProjects } from '@/lib/related';
import type { Project, ProjectSummary } from '@/lib/types';
import { READING_MAX_WIDTH } from '@/lib/ui';

interface ProjectPostProps {
  project: Project;
  related: ProjectSummary[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjectSummaries();
  return {
    paths: projects.filter((project) => project.slug).map((project) => ({ params: { slug: project.slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ProjectPostProps, { slug: string }> = async ({ params }) => {
  if (!params?.slug) return { notFound: true, revalidate: 60 };
  const [project, all] = await Promise.all([getProjectBySlug(params.slug), getProjectSummaries()]);
  if (!project) return { notFound: true, revalidate: 60 };
  return { props: { project, related: relatedProjects(project, all) }, revalidate: 600 };
};

export default function ProjectPost({ project, related }: ProjectPostProps) {
  const { content, sourceUrl } = preparePostContent(project.content, project.title);
  const githubUrl = project.githubUrl || sourceUrl || '';
  const hasBody = content.trim().length > 0;
  const showCover = Boolean(project.coverImage) && !contentHasImage(content, project.coverImage);

  return (
    <>
      <Seo
        title={project.title}
        description={project.description || excerpt(content) || undefined}
        image={project.coverImage || undefined}
        path={`/projects/${project.slug}`}
        type="article"
      />

      <Box component="article">
        <Link
          component={NextLink}
          href="/projects"
          variant="body2"
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
        >
          <ArrowBack sx={{ fontSize: 16 }} />
          All projects
        </Link>

        <Box component="header" sx={{ mt: 5, mb: { xs: 4, md: 6 } }}>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h1" sx={{ fontSize: { md: '2.75rem' }, maxWidth: 880 }}>
              {project.title}
            </Typography>
            <AdminCheck>
              <Button
                component={NextLink}
                href={`/admin/edit/${project.slug}`}
                nativeButton={false}
                variant="outlined"
                size="small"
              >
                Edit
              </Button>
            </AdminCheck>
          </Stack>
          {project.description && (
            <Typography color="textSecondary" sx={{ mt: 2, fontSize: '1.125rem', lineHeight: 1.6, maxWidth: READING_MAX_WIDTH }}>
              {project.description}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) 260px' },
            columnGap: 8,
            rowGap: 4,
            alignItems: 'start',
          }}
        >
          {/* First in the DOM so it sits above the write-up on mobile; moved to the right column on desktop. */}
          <ProjectDetails project={project} githubUrl={githubUrl} sx={{ gridColumn: { md: 2 }, gridRow: { md: 1 } }} />

          <Box sx={{ gridColumn: { md: 1 }, gridRow: { md: 1 }, minWidth: 0 }}>
            {showCover && (
              <SafeImage
                src={project.coverImage}
                alt={`${project.title} preview`}
                sx={{ display: 'block', width: '100%', mb: 5, borderRadius: 3, border: 1, borderColor: 'divider' }}
              />
            )}
            {hasBody ? (
              <MarkdownPreview content={content} />
            ) : (
              <Typography color="textSecondary">
                There&apos;s no write-up for this project yet{githubUrl ? ', but the source code is on GitHub.' : '.'}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {related.length > 0 && (
        <Box sx={{ mt: { xs: 10, md: 14 } }}>
          <Section
            id="more-projects"
            title="More projects"
            action={
              <Link
                component={NextLink}
                href="/projects"
                variant="body2"
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              >
                All projects →
              </Link>
            }
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
                gap: 2,
              }}
            >
              {related.map((other) => (
                <ProjectCard key={other._id} project={other} />
              ))}
            </Box>
          </Section>
        </Box>
      )}
    </>
  );
}
