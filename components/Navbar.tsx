import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Container, IconButton, Link, Stack } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import { profile } from '@/content/profile';
import { CONTENT_MAX_WIDTH } from '@/lib/ui';

function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const resolved = mode === 'system' ? systemMode : mode;

  // mode is undefined until mounted; reserve the space so the header doesn't shift.
  if (!resolved) return <Box sx={{ width: 36, height: 36 }} />;

  const next = resolved === 'dark' ? 'light' : 'dark';
  return (
    <IconButton
      onClick={() => setMode(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      sx={{ width: 36, height: 36, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
    >
      {resolved === 'dark' ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
    </IconButton>
  );
}

const navLinkSx = {
  fontSize: '0.9375rem',
  color: 'text.secondary',
  '&:hover': { color: 'text.primary' },
  '&[aria-current="page"]': { color: 'text.primary' },
};

export default function Navbar() {
  const { pathname } = useRouter();
  const onProjects = pathname.startsWith('/projects');

  return (
    <Box component="header">
      <Container
        maxWidth={false}
        sx={{
          maxWidth: CONTENT_MAX_WIDTH,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link component={NextLink} href="/" underline="none" sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>
          {profile.siteName}
        </Link>
        <Stack component="nav" aria-label="Main" direction="row" spacing={{ xs: 2, sm: 3 }} sx={{ alignItems: 'center' }}>
          <Link
            component={NextLink}
            href="/#experience"
            underline="none"
            sx={{ ...navLinkSx, display: { xs: 'none', sm: 'inline' } }}
          >
            Experience
          </Link>
          <Link
            component={NextLink}
            href="/projects"
            underline="none"
            aria-current={onProjects ? 'page' : undefined}
            sx={navLinkSx}
          >
            Projects
          </Link>
          <Link
            component={NextLink}
            href="/#contact"
            underline="none"
            sx={{ ...navLinkSx, display: { xs: 'none', sm: 'inline' } }}
          >
            Contact
          </Link>
          <ThemeToggle />
        </Stack>
      </Container>
    </Box>
  );
}
