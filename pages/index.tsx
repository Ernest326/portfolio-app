import { Box, Button, Container, Typography, Stack, Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <HeroSection />
      <Container>
        <AboutSection />
      </Container>
    </>
  );
}
