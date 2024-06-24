import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        ...defaultTheme.screens,
      },
      colors: {
        'clab-primary': '#292c33',
        'clab-secondary': '#a855f7',
      },
    },
  },
  plugins: [],
};
export default config;
