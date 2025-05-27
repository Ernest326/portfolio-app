import { useTheme } from "@emotion/react";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface LayoutProps {
    toggleTheme: () => void;
    mode: 'light' | 'dark';
  }

export default function Navbar({ toggleTheme, mode }: LayoutProps) {

    const router = useRouter();
    const theme = useTheme();

    return (
        <AppBar position="fixed" color="primary" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              sx={{ cursor: 'pointer', fontWeight: 700 }}
              onClick={() => router.push('/')}
            >
              About Me
            </Typography>
  
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button color="inherit" onClick={() => router.push('/projects')}>
                Projects
              </Button>
              <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                <IconButton onClick={toggleTheme} color="inherit">
                  {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
    );
}