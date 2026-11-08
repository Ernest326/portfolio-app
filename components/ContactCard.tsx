import { Box, Button, Stack, Typography } from '@mui/material';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import MailOutlined from '@mui/icons-material/MailOutlined';
import { profile } from '@/content/profile';
import { cardSx } from '@/lib/ui';

const external = { target: '_blank', rel: 'noopener noreferrer' };

export default function ContactCard() {
  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-heading"
      sx={{
        ...cardSx,
        scrollMarginTop: 24,
        p: { xs: 3, md: 5 },
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) auto' },
        alignItems: 'center',
        gap: 3,
      }}
    >
      <div>
        <Typography id="contact-heading" variant="h2">
          Get in touch
        </Typography>
        <Typography color="textSecondary" sx={{ mt: 1 }}>
          The best way to reach me is by email. You can also find me on GitHub and LinkedIn.
        </Typography>
      </div>
      <Stack direction="row" useFlexGap spacing={1.5} sx={{ flexWrap: 'wrap' }}>
        <Button variant="contained" href={`mailto:${profile.email}`} startIcon={<MailOutlined />}>
          Email me
        </Button>
        <Button variant="outlined" href={profile.links.linkedin} {...external} startIcon={<LinkedIn />}>
          LinkedIn
        </Button>
        <Button variant="outlined" href={profile.links.github} {...external} startIcon={<GitHub />}>
          GitHub
        </Button>
      </Stack>
    </Box>
  );
}
