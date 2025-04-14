export const theme = {
  colors: {
    primary: '#0A2540',
    primaryLight: '#1C3D5A',
    primaryDark: '#051B31',
    secondary: '#FFE4C8',
    secondaryLight: '#FFF1E3',
    secondaryDark: '#FFD4A8',
    accent: '#FF6B2C',
    accentLight: '#FF8F5E',
    accentDark: '#E54D10',
    text: '#0A2540',
    textLight: '#4A5568',
    textDark: '#1A202C',
    background: '#FFF9F2',
    backgroundAlt: '#FFFFFF',
    backgroundDark: '#FFE4C8',
    error: '#FF2626',
    success: '#8E9E00',
    border: '#E2E8F0',
    borderDark: '#CBD5E1',
    gradient: {
      primary: 'linear-gradient(135deg, #0A2540 0%, #1C3D5A 100%)',
      secondary: 'linear-gradient(135deg, #FFE4C8 0%, #FFF9F2 100%)',
      accent: 'linear-gradient(135deg, #FF6B2C 0%, #FF8F5E 100%)'
    }
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem'
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
    '2xl': '8rem',
    '3xl': '12rem',
    '4xl': '16rem',
    '5xl': '20rem'
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
    ultraWide: '1536px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    highlight: '0 0 0 3px rgba(0, 98, 245, 0.3)'
  },
  transitions: {
    fast: '0.15s ease-in-out',
    medium: '0.25s ease-in-out',
    slow: '0.35s ease-in-out',
    bounce: '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  radii: {
    none: '0',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    full: '9999px'
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
}
