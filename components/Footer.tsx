import { Box, Container, Typography } from '@mui/material';
import SocialLinks from '@/components/SocialLinks';
import { profile } from '@/content/profile';
import { CONTENT_MAX_WIDTH } from '@/lib/ui';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: { xs: 12, sm: 16 } }}>
      <Container maxWidth={false} sx={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <Box
          sx={{
            py: 4,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="textSecondary" suppressHydrationWarning>
            © {new Date().getFullYear()} {profile.name}
          </Typography>
          <SocialLinks />
        </Box>
      </Container>
    </Box>
  );
}
