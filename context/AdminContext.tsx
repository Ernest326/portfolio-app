import { createContext, useContext, useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'admin_token';

interface AdminContextType {
  isAdmin: boolean;
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for token on load
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!saved) {
      setLoading(false);
      return;
    }
  
    fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: saved }),
    }).then((res) => {
      setIsAdmin(res.ok);
      if (res.ok) setToken(saved);
    }).finally(() => {
      setLoading(false);
    });
    }, []);

  const login = (newToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, newToken);
    setToken(newToken);
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, token, loading, login, logout}}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook for easy access
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within <AdminProvider>');
  }
  return context;
};