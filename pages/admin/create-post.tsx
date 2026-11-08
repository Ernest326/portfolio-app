import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import ProjectForm, { type ProjectFormData } from '@/components/ProjectForm';
import Seo from '@/components/Seo';
import { useAdmin } from '@/context/AdminContext';
import AdminLogin from './login';

export default function CreatePost() {
  const { isAdmin, loading } = useAdmin();
  const router = useRouter();

  const handleSubmit = async (data: ProjectFormData) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': localStorage.getItem('admin_token') || '',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push(`/projects/${data.slug}`);
    } else {
      const { message } = await res.json().catch(() => ({ message: '' }));
      alert(`Failed to create project${message ? `: ${message}` : ''}`);
    }
  };

  if (loading) return null;
  if (!isAdmin) return <AdminLogin />;

  return (
    <>
      <Seo title="New project" noindex />
      <Typography variant="h1" sx={{ mb: 4 }}>
        New project
      </Typography>
      <ProjectForm onSubmit={handleSubmit} />
    </>
  );
}
