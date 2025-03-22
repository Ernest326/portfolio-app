import { Card, CardActionArea, CardMedia, CardContent, Typography, useTheme, Box, Chip, Stack} from '@mui/material';
import { useRouter } from 'next/router';

interface ProjectCardProps {
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  status?: string;
  tags?: string[];
}

export default function ProjectCard({title,slug,description,coverImage,status='Completed',tags=[]}: ProjectCardProps) {
  const router = useRouter();
  const theme = useTheme();

  const statusColor =  {
    'Completed': 'success',
    'In Progress': 'warning',
    'Planned': 'normal',
    'Dropped': 'error'
  }[status];

  return (
    <Card elevation={3} sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2}}>
      <CardActionArea onClick={() => router.push(`/projects/${slug}`)} 
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        
        {coverImage ? (<CardMedia component="img" height="160" image={coverImage} alt={title} sx={{objectFit: 'cover', width: '100%'}}/>) : <Box sx={{ height: 160, backgroundColor: 'grey.200' }} />}

        <CardContent sx={{ flexGrow: 1 }}>

          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {description || 'No description provided.'}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Chip label={status} color={statusColor as any} size="small" sx={{ mb: 1}} />

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}

          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
