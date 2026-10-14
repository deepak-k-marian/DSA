import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1c2525',
        muted: '#66706d',
        paper: '#f4f1ea',
        cream: '#fbfaf6',
        mint: '#c8e9d8',
        'mint-deep': '#2d6c58',
        coral: '#e9785b',
        line: '#d7d8cf',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
