import { Box, Button, Container, Typography, Stack, Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsPage from './projects';
import RecentProjects from '@/components/RecentProjects';

export default function HomePage() {
  const router = useRouter();

  const pinnedProjects = [
    "microsoft-deliverables"
  ];

  return (
    <>
      <HeroSection />
      <Container>
        <AboutSection />
        <Typography variant="h5" color="secondary" sx={{px:5}} gutterBottom>My Most Recent Projects</Typography>
        <RecentProjects limit={5}/>
        <Typography variant="h5" color="secondary" sx={{mt:15, px:5}} gutterBottom>Pinned Projects</Typography>
        <RecentProjects limit={5} projectIds={pinnedProjects}/>
      </Container>
    </>
  );
}
