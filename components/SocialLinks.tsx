import { Link, Stack } from '@mui/material';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import MailOutlined from '@mui/icons-material/MailOutlined';
import { profile } from '@/content/profile';

const links = [
  { label: 'GitHub', href: profile.links.github, Icon: GitHub, newTab: true },
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: LinkedIn, newTab: true },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: MailOutlined, newTab: false },
  ...(process.env.NEXT_PUBLIC_HAS_CV
    ? [{ label: 'CV', href: profile.cvPath, Icon: DescriptionOutlined, newTab: true }]
    : []),
];

export default function SocialLinks({ showIcons = false }: { showIcons?: boolean }) {
  return (
    <Stack
      component="ul"
      direction="row"
      sx={{ flexWrap: 'wrap', columnGap: 2.5, rowGap: 1, listStyle: 'none', m: 0, p: 0 }}
    >
      {links.map(({ label, href, Icon, newTab }) => (
        <li key={label}>
          <Link
            href={href}
            variant="body2"
            {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
            }}
          >
            {showIcons && <Icon sx={{ fontSize: 18 }} />}
            {label}
          </Link>
        </li>
      ))}
    </Stack>
  );
}
