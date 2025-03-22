import { GetServerSideProps } from 'next';
import clientPromise from '@/lib/mongodb';
import { Container, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

export default function ProjectDetail({ project }: any) {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>{project.title}</Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Posted on {new Date(project.createdAt).toLocaleDateString()}
      </Typography>
      <ReactMarkdown>{project.content}</ReactMarkdown>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = await clientPromise;
  const db = client.db('portfolio');
  const slug = context.params?.slug;

  const project = await db.collection('projects').findOne({ slug });

  if (!project) {
    return { notFound: true };
  }

  // Convert MongoDB fields safely for serialization
  const serializedProject = {
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toString() ?? new Date().toISOString()
  };

  return {
    props: {
      project: serializedProject
    }
  };
};