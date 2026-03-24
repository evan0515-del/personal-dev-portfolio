import typography from '@tailwindcss/typography';
import type {Config} from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
    './messages/**/*.json'
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem'
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        ring: 'hsl(var(--ring))'
      },
      fontFamily: {
        sans: ['var(--font-sans)', '"Noto Sans SC"', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-serif)', '"Noto Serif SC"', 'ui-serif', 'Georgia'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular']
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top left, hsl(var(--accent) / 0.24), transparent 36%), radial-gradient(circle at bottom right, hsl(var(--foreground) / 0.08), transparent 28%)'
      },
      boxShadow: {
        panel: '0 24px 80px -32px rgba(15, 23, 42, 0.42)'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: [typography]
};

export default config;
