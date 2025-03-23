import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#f0f0f0',
              paper: '#ffffff',
            },
          }
        : {
            background: {
              default: '#1f1f1f',
              paper: '#191919',
            },
          }),
      ...(mode === 'light'
        ? {
            primary: {
              main: '#5985ab',
            },
          }
        : {
            primary: {
              main: '#4a378c',
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