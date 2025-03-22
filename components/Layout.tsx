import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface LayoutProps {
    children: React.ReactNode;
    toggleTheme: () => void;
    mode: 'light' | 'dark';
  }

  export default function Layout({ children, toggleTheme, mode }: LayoutProps) {
    const router = useRouter();
    const theme = useTheme();
  
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              sx={{ cursor: 'pointer', fontWeight: 700 }}
              onClick={() => router.push('/')}
            >
              My Portfolio
            </Typography>
  
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button color="inherit" onClick={() => router.push('/projects')}>
                Projects
              </Button>
              <Button color="inherit" onClick={() => router.push('/admin')}>
                Admin
              </Button>
              <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                <IconButton onClick={toggleTheme} color="inherit">
                  {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
  
        <Box component="main" sx={{ py: 4, px: 2 }}>{children}</Box>
  
        <Box component="footer" sx={{ textAlign: 'center', py: 3, fontSize: '0.875rem', color: 'text.secondary' }}>
          &copy; {new Date().getFullYear()} My Portfolio
        </Box>
      </Box>
    );
  }