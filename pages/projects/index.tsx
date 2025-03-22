import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Skeleton, Button} from '@mui/material';
import ProjectCard from '@/components/ProjectCard';
import { AdminProvider } from '@/context/AdminContext';
import AdminCheck from '@/components/AdminCheck';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <AdminProvider>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom> Projects</Typography>
      <AdminCheck> <Button variant="contained" color="info" sx={{mb: 5}} href="/admin/create-post"> Create New Project </Button> </AdminCheck>
      <Grid container spacing={4}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </Grid>
            ))
          : projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} sx={{display: 'flex'}}>
                <ProjectCard
                    title={project.title}
                    slug={project.slug}
                    description={project.description}
                    coverImage={project.coverImage}
                    status={project.status}
                    tags={project.tags}
                />
            </Grid>
            ))}
      </Grid>
    </Container>
    </AdminProvider>
  );
}