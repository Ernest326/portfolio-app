import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
    toggleTheme: () => void;
    mode: 'light' | 'dark';
  }

  export default function Layout({ children, toggleTheme, mode }: LayoutProps) {
  
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <Navbar toggleTheme={toggleTheme} mode={mode}/>
        <Box component="main" sx={{ py: 4, px: 2 }}>{children}</Box>
        <Footer />
      </Box>
    );
  }