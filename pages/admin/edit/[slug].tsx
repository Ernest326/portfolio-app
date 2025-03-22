import { GetServerSideProps } from 'next';
import clientPromise from '@/lib/mongodb';
import ProjectForm from '@/components/ProjectForm';
import { useRouter } from 'next/router';
import { Container, Button, Stack } from '@mui/material';
import { useAdmin } from '@/context/AdminContext';
import AdminLogin from '../login';

export default function EditProject({ project }: any) {
  const router = useRouter();
  const { isAdmin } = useAdmin();

  const handleSubmit = async (updatedData: any) => {
    const res = await fetch(`/api/projects/${project._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': localStorage.getItem('admin_token') || '',
      },
      body: JSON.stringify(updatedData),
    });

    const resText = await res.text();
    console.log('Server responded with:', res.status, resText);

    if (res.ok) {
      router.push(`/projects/${project.slug}`);
    } else {
      alert('Failed to update project');
    }
  };

  const handleDelte = async () => {
    const res = await fetch(`/api/projects/${project._id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-secret': localStorage.getItem('admin_token') || '',
      },
    });

    if (res.ok) {
      router.push('/projects');
    } else {
      alert('Failed to delete project');
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>

        {!isAdmin ? (
            <>
            <AdminLogin/>
            </>
        ) : (
            <>
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
            <Button variant='contained' color='info' onClick={() => router.push(`/projects/${project.slug}`)}>Back</Button>
            <Button variant='contained' color='error' onClick={() => handleDelte()}>Delete</Button> 
            </Stack>
            <ProjectForm initialData={project} onSubmit={handleSubmit} />
            </>
        )}

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