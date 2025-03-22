import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#f9f9f9',
              paper: '#ffffff',
            },
          }
        : {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
      ...(mode === 'light'
        ? {
            primary: {
              main: '#e0c787',
            },
          }
        : {
            primary: {
              main: '#35246e',
            },
          }),
    },
    typography: {
      fontFamily: `'Inter', sans-serif`,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
          },
        },
      },
    },
  });