// pages/test-admin.tsx
import { useAdmin } from '@/context/AdminContext';

export default function TestAdmin() {
  const { isAdmin, loading } = useAdmin();

  if (loading) return <p>Loading...</p>;
  return <p>{isAdmin ? '✅ You are admin' : '❌ Not admin'}</p>;
}