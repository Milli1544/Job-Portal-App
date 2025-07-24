import { createTheme } from '@mui/material/styles'

// Modern 2024-2025 color palette with nature-inspired colors
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E3A8A', // Deep professional blue
      light: '#3B82F6',
      dark: '#1E40AF',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#B75D3F', // Mocha Mousse (Pantone 2025)
      light: '#D97706',
      dark: '#92400E',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#228B22', // Forest green
      light: '#10B981',
      dark: '#059669'
    },
    warning: {
      main: '#FF8C00', // Warm orange
      light: '#F59E0B',
      dark: '#D97706'
    },
    error: {
      main: '#DC2626',
      light: '#EF4444',
      dark: '#B91C1C'
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
      secondary: '#F1F5F9'
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      disabled: '#9CA3AF'
    },
    divider: '#E5E7EB',
    // Custom colors for job portal
    custom: {
      terracotta: '#B75D3F',
      warmBrown: '#8B4513',
      oliveGreen: '#808000',
      slateGray: '#475569',
      charcoal: '#2C2C2C'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.025em'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '-0.025em'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.3
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.00938em'
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.01071em'
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      letterSpacing: '0.03333em'
    }
  },
  shape: {
    borderRadius: 12
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }
        },
        contained: {
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #F1F5F9',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#B75D3F'
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }
      }
    }
  }
})

export default theme