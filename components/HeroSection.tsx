import React from 'react';
import { Box } from '@mui/material';
import ThreeCanvas from './ThreeCanvas';
import TerminalTyper from './TerminalTyper';

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ThreeCanvas />
      <TerminalTyper />
    </Box>
  );
};

export default HeroSection;