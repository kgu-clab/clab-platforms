/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'clab-main': '#292c33',
        'clab-main-light': '#7c7d7f',
        'clab-main-dark': '#121415',
      },
    },
  },
  plugins: [],
};
