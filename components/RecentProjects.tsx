import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Skeleton
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import ProjectCard from '@/components/ProjectCard';
import { motion, useInView } from 'framer-motion';

interface ProjectProps {
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  status?: string;
  tags?: string[];
  dateCreated?: string;
}

interface RecentProjectsProps {
  limit?: number;
  projectIds?: string[];
}

export default function RecentProjects({ limit = 5, projectIds = [] }: RecentProjectsProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();

        if(projectIds.length > 0) {
            // Filter projects by provided IDs if any
            const sorted = data.filter((project: ProjectProps) => projectIds.includes(project.slug))
                                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setProjects(sorted.slice(0, limit));
        } else {
            const sorted = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setProjects(sorted.slice(0, limit));
        }
        
        
      } catch (err) {
        console.error('Failed to load recent projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [limit]);

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

return (
    <Box
        sx={{ my: 4, position: 'relative' }}
        id="projects-section"
        component={motion.section}
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
    >
        <IconButton
            onClick={() => scroll('left')}
            sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                zIndex: 1,
                transform: 'translateY(-50%)',
                backgroundColor: 'primary.main',
                boxShadow: 1,
                '&:hover': { backgroundColor: 'primary.dark'},
            }}
        >
            <ChevronLeft />
        </IconButton>

        <IconButton
            onClick={() => scroll('right')}
            sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                zIndex: 1,
                transform: 'translateY(-50%)',
                backgroundColor: 'primary.main',
                boxShadow: 1,
                '&:hover': { backgroundColor: 'primary.dark'},
            }}
        >
            <ChevronRight />
        </IconButton>

        <Box
            ref={containerRef}
            sx={{
                display: 'flex',
                gap: 2,
                overflowX: 'hidden',
                scrollBehavior: 'smooth',
                px: 5,
                alignItems: 'stretch',
            }}
        >
            {loading
                ? Array.from({ length: limit }).map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                minWidth: 300,
                                maxWidth: 300,
                                flex: '0 0 300px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Skeleton variant="rectangular" height={200} />
                            <Skeleton width="60%" />
                            <Skeleton width="40%" />
                        </Box>
                    ))
                : projects.map((project, i) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            style={{
                                minWidth: 300,
                                maxWidth: 300,
                                flex: '0 0 300px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
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
                    ))}
        </Box>
    </Box>
);
}
