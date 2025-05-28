import { Box, Button, Container, Typography, Stack, Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsPage from './projects';
import RecentProjects from '@/components/RecentProjects';
import clientPromise from '@/lib/mongodb';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const router = useRouter();

  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        setSettings(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    }
    fetchSettings();
  }, []);

  return (
    <>
      <HeroSection />
      <Container>
        <AboutSection />
        <Typography variant="h5" color="secondary" sx={{px:5}} gutterBottom>My Most Recent Projects</Typography>
        <RecentProjects limit={5}/>
        <Typography variant="h5" color="secondary" sx={{mt:15, px:5}} gutterBottom>Pinned Projects</Typography> 
        {!loading && <RecentProjects limit={5} projectIds={settings.pinnedProjects}/>}
      </Container>
    </>
  );
}
