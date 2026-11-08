import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Layout from '@/components/Layout';
import { AdminProvider } from '@/context/AdminContext';
import { theme } from '@/lib/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline enableColorScheme />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      </Head>
      <AdminProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AdminProvider>
    </ThemeProvider>
  );
}
