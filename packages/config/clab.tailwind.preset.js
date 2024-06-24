import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
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
          ...defaultTheme.container.screens,
        },
      },
      colors: {
        'clab-gray': {
          50: '#f4f4f5',
          100: '#e1e1e3',
          200: '#c7c8c9',
          300: '#adaeb0',
          400: '#949597',
          500: '#7c7d7f',
          600: '#68696b',
          700: '#545556',
          800: '#404142',
          900: '#2c2d2e',
        },
        'clab-blue': {
          50: '#f2f2f3',
          100: '#d9dadf',
          200: '#bfc1cb',
          300: '#a5a8b7',
          400: '#8c8fa3',
          500: '#73768f',
          600: '#595d7b',
          700: '#292c33',
          800: '#202127',
          900: '#16171b',
        },
        'clab-purple': {
          50: '#f9f5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#a855f7',
          500: '#9333ea',
          600: '#7e22ce',
          700: '#6b21a8',
          800: '#581c87',
          900: '#3b0764',
        },
        ...defaultTheme.colors,
      },
    },
  },
  plugins: [],
};
