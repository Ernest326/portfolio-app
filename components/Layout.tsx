import { Box, Container, Link } from '@mui/material';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { CONTENT_MAX_WIDTH } from '@/lib/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Link
        href="#main"
        sx={{
          position: 'absolute',
          left: 16,
          top: -48,
          zIndex: 10,
          px: 1.5,
          py: 1,
          borderRadius: 1,
          bgcolor: 'text.primary',
          color: 'background.default',
          '&:focus': { top: 12 },
        }}
      >
        Skip to content
      </Link>
      <Navbar />
      <Container
        component="main"
        id="main"
        maxWidth={false}
        sx={{ maxWidth: CONTENT_MAX_WIDTH, flex: 1, pt: { xs: 5, sm: 9 } }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
