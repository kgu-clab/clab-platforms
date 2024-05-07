import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1280px',
        },
      },
      colors: {
        'clab-main': '#292c33',
        'clab-main-light': '#7c7d7f',
        'clab-main-dark': '#121415',
      },
    },
  },
  plugins: [],
};
export default config;
