import { GetServerSideProps } from 'next';
import clientPromise from '@/lib/mongodb';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import MarkdownPreview from '@/components/MarkdownPreview';
import AdminCheck from '@/components/AdminCheck';
import { useRouter } from 'next/router';

export default function ProjectDetail({ project }: any) {
  
    const router = useRouter();
  
    return (
    <Container maxWidth="md" sx={{ py: 6 }}>
     
      {/* Title */}
      <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}> {project.title} </Typography>
        <AdminCheck>
            <Button variant='contained' color='info' onClick={() => router.push(`/admin/edit/${project.slug}`)}>EDIT</Button>
        </AdminCheck>
      </Stack>

      {/* Date */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Posted on {new Date(project.createdAt).toLocaleDateString()}
      </Typography>

      {/* Optional Banner */}
      {project.coverImage && (
        <Box
          component="img"
          src={project.coverImage}
          alt={project.title}
          sx={{
            width: '100%',
            borderRadius: 2,
            boxShadow: 2,
            mb: 4,
            maxHeight: 400,
            objectFit: 'cover',
          }}
        />
      )}

      {/* Markdown Content */}
      <MarkdownPreview content={project.content} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;
  const client = await clientPromise;
  const db = client.db('portfolio');

  const project = await db.collection('projects').findOne({ slug });

  if (!project) return { notFound: true };

  const serializedProject = {
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toString() ?? '',
    updatedAt: project.updatedAt?.toString() ?? ''
  };

  return {
    props: { project: serializedProject },
  };
};
