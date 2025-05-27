import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import { getTheme } from '@/lib/theme';
import { AdminProvider } from '@/context/AdminContext';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setMode('dark');
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminProvider>
      <Layout toggleTheme={toggleTheme} mode={mode}>
        <Component {...pageProps} />
      </Layout>
      </AdminProvider>
    </ThemeProvider>
  );
}