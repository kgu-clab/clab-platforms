/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx}',
    path.join(path.dirname(require.resolve('@clab/design-system')), '**/*.js'),
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.25rem',
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
