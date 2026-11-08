import { createTheme } from '@mui/material/styles';
import { monoFontFamily, sansFontFamily } from '@/lib/fonts';

const slate = {
  100: '#f1f5f9',
  200: '#e2e8f0',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  900: '#0f172a',
};

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: slate[900], contrastText: '#ffffff' },
        secondary: { main: slate[500] },
        text: { primary: slate[900], secondary: slate[600], disabled: slate[400] },
        background: { default: '#ffffff', paper: '#f8fafc' },
        divider: slate[200],
      },
    },
    dark: {
      palette: {
        primary: { main: slate[100], contrastText: slate[900] },
        secondary: { main: slate[400] },
        text: { primary: slate[100], secondary: slate[400], disabled: slate[600] },
        background: { default: slate[900], paper: '#141d2f' },
        divider: 'rgba(148, 163, 184, 0.18)',
      },
    },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: sansFontFamily,
    h1: {
      fontSize: 'clamp(1.75rem, 1.45rem + 1.2vw, 2.25rem)',
      fontWeight: 600,
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
    },
    h2: { fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.35 },
    h3: { fontSize: '1.0625rem', fontWeight: 600, lineHeight: 1.5 },
    subtitle1: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.7 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
    caption: { fontSize: '0.8125rem', lineHeight: 1.5 },
    overline: {
      fontFamily: monoFontFamily,
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.08em',
      lineHeight: 1.5,
    },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '::selection': {
          backgroundColor: theme.vars.palette.text.primary,
          color: theme.vars.palette.background.default,
        },
        ':focus-visible': {
          outline: `2px solid ${theme.vars.palette.text.primary}`,
          outlineOffset: 2,
        },
      }),
    },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiLink: {
      defaultProps: { underline: 'hover', color: 'inherit' },
      styleOverrides: { root: { textUnderlineOffset: '3px' } },
    },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontFamily: monoFontFamily, fontSize: '0.75rem' },
      },
    },
  },
});
