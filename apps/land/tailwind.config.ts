import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'nanum-square': ['NanumSquare', 'sans-serif'],
        'dung-geun-mo': ['DungGeunMo', 'sans-serif'],
      },
      colors: {
        'clab-yellow': '#FFE658',
        'clab-blue': '#697FBD',
        'clab-gray': '#151515',
        'clab-yellow-gray': '#323024',
        'clab-light-blue': '#BDC7E2',
        'clab-dark-yellow': '#938D65',
        'clab-light-gray': '#24252B',
      },
    },
  },
  plugins: [],
};
export default config;
