import {Container} from '@mui/material';
import { useAdmin } from '@/context/AdminContext';
import AdminLogin from './login';
import ProjectForm from '@/components/ProjectForm';
import { useRouter } from 'next/router';

export default function CreatePost() {

  const { isAdmin } = useAdmin();
  const router = useRouter();

  const handleSubmit = async (data : any) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': localStorage.getItem('admin_token') || '',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/projects/'+data.slug);
    } else {
      alert('Failed to create project');
    }
  };

  return (

    <Container maxWidth="md" sx={{ mt: 4 }}>
      {!isAdmin ? (
        <>
          <AdminLogin/>
        </>
      ) : (
        <ProjectForm onSubmit={handleSubmit} />
      )}
    </Container>

  );
}
