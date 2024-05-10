/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'clab-primary': '#292c33',
        'clab-secondary': '#a855f7',
      },
    },
  },
  plugins: [],
};
