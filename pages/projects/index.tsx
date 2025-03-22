import { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>My Projects</Typography>
      <Grid container spacing={4}>
        {projects.map((project: any) => (
          <Grid item xs={12} md={6} key={project._id}>
            <Link href={`/projects/${project.slug}`} passHref>
              <Card sx={{ cursor: 'pointer' }}>
                <CardContent>
                  <Typography variant="h5">{project.title}</Typography>
                  <Typography variant="body2">
                    {project.description || 'No description.'}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}