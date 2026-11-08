import type { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import AtAGlance from '@/components/AtAGlance';
import ContactCard from '@/components/ContactCard';
import EntryCards from '@/components/EntryCards';
import ProjectCard, { FeaturedProjectCard } from '@/components/ProjectCard';
import Section from '@/components/Section';
import Seo from '@/components/Seo';
import SkillGrid from '@/components/SkillGrid';
import SocialLinks from '@/components/SocialLinks';
import TimelineList from '@/components/TimelineList';
import {
  achievements,
  community,
  education,
  experience,
  glance,
  hackathons,
  profile,
  skills,
} from '@/content/profile';
import { getPinnedSlugs, getProjectSummaries } from '@/lib/projects';
import type { ProjectSummary } from '@/lib/types';
import { cardSx, twoColumnReverseSx, twoColumnSx } from '@/lib/ui';

const projectGridSx = {
  display: 'grid',
  gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
  gap: 2,
};

interface HomeProps {
  featured: ProjectSummary[];
  projectCount: number;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [projects, pinnedSlugs] = await Promise.all([getProjectSummaries(), getPinnedSlugs()]);
  const bySlug = new Map(projects.map((project) => [project.slug, project]));
  const pinned = pinnedSlugs.flatMap((slug) => bySlug.get(slug) ?? []);

  return {
    props: { featured: pinned.length > 0 ? pinned : projects.slice(0, 4), projectCount: projects.length },
    revalidate: 600,
  };
};

export default function HomePage({ featured, projectCount }: HomeProps) {
  const [lead, ...others] = featured;

  return (
    <>
      <Seo description={`${profile.name}, ${profile.headline}. Projects, experience and skills.`} path="/" />
      <Stack spacing={{ xs: 10, md: 14 }}>
        <Box component="section" aria-label="Introduction" sx={{ ...twoColumnSx, rowGap: 6, alignItems: 'start' }}>
          <div>
            <Typography variant="h1" sx={{ fontSize: { md: '3rem' } }}>
              {profile.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1, fontSize: '1.0625rem' }}>
              {profile.headline}
            </Typography>
            <Stack spacing={2} sx={{ mt: 4 }}>
              {profile.intro.map((paragraph) => (
                <Typography key={paragraph} variant="body1">
                  {paragraph}
                </Typography>
              ))}
            </Stack>
            <Stack direction="row" useFlexGap spacing={1.5} sx={{ mt: 4, flexWrap: 'wrap' }}>
              <Button component={NextLink} href="/projects" nativeButton={false} variant="contained">
                View projects
              </Button>
              <Button component={NextLink} href="/#contact" nativeButton={false} variant="outlined">
                Get in touch
              </Button>
            </Stack>
            <Box sx={{ mt: 3 }}>
              <SocialLinks showIcons />
            </Box>
          </div>
          <AtAGlance items={glance} />
        </Box>

        {lead && (
          <Section
            id="projects"
            title="Selected projects"
            action={
              <Link
                component={NextLink}
                href="/projects"
                variant="body2"
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
              >
                All {projectCount} projects →
              </Link>
            }
          >
            {/* With 3, 6, 9… pinned the lead fills a 2×2 block so every row comes out full; otherwise a wide featured card. */}
            {others.length % 3 === 2 ? (
              <Box sx={projectGridSx}>
                <ProjectCard
                  project={lead}
                  size="large"
                  sx={{ gridColumn: { md: 'span 2' }, gridRow: { md: 'span 2' } }}
                />
                {others.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </Box>
            ) : (
              <Stack spacing={2}>
                <FeaturedProjectCard project={lead} />
                {others.length > 0 && (
                  <Box sx={projectGridSx}>
                    {others.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                  </Box>
                )}
              </Stack>
            )}
          </Section>
        )}

        <Box sx={{ ...twoColumnSx, rowGap: 10 }}>
          <Section id="experience" title="Experience">
            <TimelineList entries={experience} variant="rail" />
          </Section>
          <Section id="education" title="Education">
            <Box sx={{ ...cardSx, p: 3 }}>
              <TimelineList entries={education} />
            </Box>
          </Section>
        </Box>

        <Section id="skills" title="Skills">
          <SkillGrid groups={skills} />
        </Section>

        <Section id="hackathons" title="Hackathons & competitions">
          <EntryCards entries={hackathons} />
        </Section>

        <Box sx={{ ...twoColumnReverseSx, rowGap: 10 }}>
          <Section id="achievements" title="Achievements">
            <Box sx={{ ...cardSx, p: 3 }}>
              <TimelineList entries={achievements} />
            </Box>
          </Section>
          <Section id="community" title="Community">
            <TimelineList entries={community} />
          </Section>
        </Box>

        <ContactCard />
      </Stack>
    </>
  );
}
