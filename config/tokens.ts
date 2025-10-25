/**
 * Design System Tokens
 * Caribbean Azure Brand
 */

export const tokens = {
  colors: {
    brand: {
      azure: '#0F5FFF',
      azureDark: '#0A4ACC',
      azureLight: '#4080FF',
    },
    neutral: {
      white: '#FAFAFA',
      background: '#FFFFFF',
      foreground: '#1F2937',
      muted: '#F3F4F6',
      mutedForeground: '#6B7280',
      border: '#E5E7EB',
    },
    accent: {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
    },
  },

  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
    '4xl': '6rem',  // 96px
    section: '6rem', // Vertical section padding
  },

  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    full: '9999px',
  },

  shadows: {
    soft: '0 2px 12px rgba(0, 0, 0, 0.04)',
    medium: '0 4px 24px rgba(0, 0, 0, 0.08)',
    strong: '0 8px 40px rgba(0, 0, 0, 0.12)',
    hover: '0 12px 48px rgba(0, 0, 0, 0.16)',
  },

  transitions: {
    quick: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    emphasis: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
      mono: 'var(--font-geist-mono), monospace',
    },
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      base: '1rem',    // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      '2xl': '1.75rem', // 28px
      '3xl': '2.5rem',  // 40px
      '4xl': '3.5rem',  // 56px
      '5xl': '4rem',    // 64px
    },
    lineHeight: {
      tight: '1.1',
      snug: '1.3',
      normal: '1.5',
      relaxed: '1.7',
      loose: '2',
    },
    tracking: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.02em',
    },
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
  },

  animation: {
    fadeIn: 'fadeIn 400ms ease-in',
    fadeOut: 'fadeOut 400ms ease-out',
    slideUp: 'slideUp 300ms ease-out',
    slideDown: 'slideDown 300ms ease-out',
    scaleIn: 'scaleIn 200ms ease-out',
    scaleOut: 'scaleOut 200ms ease-out',
  },
} as const

export type Tokens = typeof tokens
