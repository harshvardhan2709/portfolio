function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variableName}) / ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: withOpacity('--bg-primary'),
          surface: withOpacity('--bg-surface'),
          elevated: withOpacity('--bg-elevated'),
        },
        border: {
          DEFAULT: withOpacity('--border-default'),
          hover: withOpacity('--border-hover'),
        },
        text: {
          primary: withOpacity('--text-primary'),
          secondary: withOpacity('--text-secondary'),
          muted: withOpacity('--text-muted'),
        },
        accent: {
          DEFAULT: withOpacity('--accent-default'),
          light: withOpacity('--accent-light'),
          mint: withOpacity('--accent-mint'),
          glow: withOpacity('--accent-glow'),
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 9vw, 7.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em', fontWeight: '500' }],
        'display': ['clamp(2.75rem, 6.5vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '500' }],
        'display-sm': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '500' }],
        'heading': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '500' }],
        'heading-sm': ['1.375rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.75' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'caption': ['0.875rem', { lineHeight: '1.6' }],
        'label': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: '500' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '128': '32rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 60px rgba(45, 106, 79, 0.08)',
        'glow-sm': '0 0 30px rgba(45, 106, 79, 0.06)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};
