import { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Grid, Skeleton, Button, Box, TextField, InputLabel, FormControl, MenuItem, Select, Checkbox} from '@mui/material';
import ProjectCard from '@/components/ProjectCard';
import { AdminProvider } from '@/context/AdminContext';
import AdminCheck from '@/components/AdminCheck';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'In Progress' | 'Planned' | 'On Hold' | 'Dropped'>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        const sorted = data.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setProjects(sorted);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((project) => {
      project.tags?.forEach((tag: string) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [projects]);

  const sortedTags = useMemo(() => {
    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
  }, [tagCounts]);

  const filteredProjects = projects.filter((project) => {
    const matchesStatus =
      statusFilter === 'All' || project.status === statusFilter;
  
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags?.some((tag: string) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => project.tags?.includes(tag));
    return matchesStatus && matchesSearch && matchesTags;
  });

  return (
    <AdminProvider>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom> Projects</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 4 }}>

      <TextField
        label="Search projects..."
        variant="outlined"
        value={searchQuery}
        sx={{ flexGrow: 1 }}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <FormControl sx={{ minWidth: 220 }}>
        <InputLabel>Tags</InputLabel>
        <Select multiple value={selectedTags} onChange={(e) => setSelectedTags(e.target.value as string[])} renderValue={(selected) => selected.join(', ')} label="Tags">
        {sortedTags.map(([tag, count]) => (
          <MenuItem key={tag} value={tag}>
            <Checkbox checked={selectedTags.indexOf(tag) > -1} />
            <Typography sx={{ ml: 1 }}>{tag} ({count})</Typography>
          </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          label="Status"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Planned">Planned</MenuItem>
          <MenuItem value="On Hold">On Hold</MenuItem>
          <MenuItem value="Dropped">Dropped</MenuItem>
        </Select>
      </FormControl>
    </Box>
      <AdminCheck> <Button variant="contained" color="info" sx={{mb: 5}} href="/admin/create-post"> Create New Project </Button> </AdminCheck>
      <Grid container spacing={2} >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </Grid>
            ))
          : filteredProjects.map((project, i) => (
            <Grid item xs={12} sm={6} md={4} sx={{display: 'flex'}}>
                <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
                style={{ width: '100%' }}
                >
                <ProjectCard
                    title={project.title}
                    slug={project.slug}
                    description={project.description}
                    coverImage={project.coverImage}
                    status={project.status}
                    tags={project.tags}
                    dateCreated={new Date(project.createdAt).toLocaleDateString()}
                />
                </motion.div>
            </Grid>
            ))}
      </Grid>
    </Container>
    </AdminProvider>
  );
}