import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>Welcome to My Portfolio</Typography>
      <Typography variant="body1" gutterBottom>
        Explore my work, skills, and projects.
      </Typography>
      <Link href="/projects" passHref>
        <Button variant="contained">View Projects</Button>
      </Link>
    </Container>
  );
}