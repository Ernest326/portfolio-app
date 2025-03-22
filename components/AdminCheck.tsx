import { useAdmin } from '@/context/AdminContext';

export default function AdminCheck({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAdmin();
  if (!isAdmin) return null;
  return <>{children}</>;
}