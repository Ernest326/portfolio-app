import type { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Stack, Typography } from '@mui/material';
import ProjectForm, { type ProjectFormData } from '@/components/ProjectForm';
import Seo from '@/components/Seo';
import { useAdmin } from '@/context/AdminContext';
import { getProjectBySlug } from '@/lib/projects';
import type { Project } from '@/lib/types';
import { READING_MAX_WIDTH } from '@/lib/ui';
import AdminLogin from '../login';

export default function EditProject({ project }: { project: Project }) {
  const router = useRouter();
  const { isAdmin, loading } = useAdmin();

  const handleSubmit = async (updatedData: ProjectFormData) => {
    const res = await fetch(`/api/projects/${project._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': localStorage.getItem('admin_token') || '',
      },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      router.push(`/projects/${updatedData.slug}`);
    } else {
      const { message } = await res.json().catch(() => ({ message: '' }));
      alert(`Failed to update project${message ? `: ${message}` : ''}`);
    }
  };

  const handleDelte = async () => {
    if (!window.confirm(`Delete "${project.title}"? This can't be undone.`)) return;

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
  };

  if (loading) return null;
  if (!isAdmin) return <AdminLogin />;

  return (
    <>
      <Seo title={`Edit ${project.title}`} noindex />
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4, maxWidth: READING_MAX_WIDTH }}
      >
        <Typography variant="h1">Edit project</Typography>
        <Stack direction="row" spacing={1}>
          <Button
            component={NextLink}
            href={`/projects/${project.slug}`}
            nativeButton={false}
            variant="outlined"
            size="small"
          >
            View
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={handleDelte}>
            Delete
          </Button>
        </Stack>
      </Stack>
      <ProjectForm initialData={project} onSubmit={handleSubmit} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;
  const project = typeof slug === 'string' ? await getProjectBySlug(slug) : null;
  if (!project) return { notFound: true };
  return { props: { project } };
};
