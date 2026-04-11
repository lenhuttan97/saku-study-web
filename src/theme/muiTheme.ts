import { createTheme } from '@mui/material/styles';

// Brand colors — keep in sync with Tailwind tokens in src/index.css
const BRAND_PURPLE = '#7C3AED';
const BRAND_PINK = '#EC4899';
const BRAND_BLUE = '#3B82F6';
const BG_MAIN = '#FDF8FF';
const BG_CARD = '#FFFFFF';

// Semantic color definitions
const SUCCESS_COLOR = '#10B981'; // emerald-500
const WARNING_COLOR = '#F59E0B'; // amber-500
const ERROR_COLOR = '#EF4444';   // red-500
const INFO_COLOR = '#3B82F6';    // blue-500

const muiTheme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: true,
  },
  palette: {
    mode: 'light',
    primary: {
      main: BRAND_PURPLE,
      light: '#9B6AFF',
      dark: '#5B21B6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: BRAND_PINK,
      light: '#F472B6',
      dark: '#BE185D',
      contrastText: '#FFFFFF',
    },
    background: {
      default: BG_MAIN,
      paper: BG_CARD,
    },
    text: {
      primary: '#0F172A', // slate-900
      secondary: '#475569', // slate-600
    },
    success: {
      main: SUCCESS_COLOR,
      light: '#34D399', // emerald-400
      dark: '#059669',  // emerald-600
      contrastText: '#FFFFFF',
    },
    warning: {
      main: WARNING_COLOR,
      light: '#FBBF24', // amber-400
      dark: '#D97706',  // amber-600
      contrastText: '#FFFFFF',
    },
    error: {
      main: ERROR_COLOR,
      light: '#F87171', // red-400
      dark: '#DC2626',  // red-600
      contrastText: '#FFFFFF',
    },
    info: {
      main: INFO_COLOR,
      light: '#60A5FA', // blue-400
      dark: '#2563EB',  // blue-600
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif',
    h1: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif',
    },
    body2: {
      fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", ui-sans-serif, system-ui, sans-serif',
    },
    button: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      fontWeight: 600,
      textTransform: 'none', // Disable MUI's default uppercase buttons
    },
  },
  shape: {
    borderRadius: 12, // ~rounded-xl in Tailwind
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)', // card-shadow equivalent
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    '0 4px 20px -2px rgba(0, 0, 0, 0.05)', // Added 25th element
  ],
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12, // rounded-xl
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 20px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
        outlined: {
          borderWidth: 1.5,
        },
        sizeSmall: {
          padding: '6px 14px',
          fontSize: '0.8125rem',
        },
        sizeLarge: {
          padding: '12px 28px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // rounded-xl
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)', // matches .card-shadow
          backgroundColor: BG_CARD,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20,
          '&:last-child': {
            paddingBottom: 20,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // rounded-lg
            '& fieldset': {
              borderColor: '#CBD5E1', // slate-300
            },
            '&:hover fieldset': {
              borderColor: BRAND_PURPLE,
            },
            '&.Mui-focused fieldset': {
              borderColor: BRAND_PURPLE,
              borderWidth: 1.5,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8, // rounded-lg
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: BRAND_PURPLE,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: BG_CARD,
          borderRight: '1px solid #F1F5F9',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Disable MUI's default gradient overlay
        },
      },
    },
  },
});

export default muiTheme;