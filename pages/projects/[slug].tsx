import { GetServerSideProps } from 'next';
import clientPromise from '@/lib/mongodb';
import { Box, Container, Typography } from '@mui/material';
import MarkdownPreview from '@/components/MarkdownPreview';

export default function ProjectDetail({ project }: any) {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Title */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        {project.title}
      </Typography>

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
  };

  return {
    props: { project: serializedProject },
  };
};
