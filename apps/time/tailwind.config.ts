import type { Config } from 'tailwindcss';
import path from 'path';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    path.join(path.dirname(require.resolve('@clab/design-system')), '**/*.js'),
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
      },
    },
  },
  plugins: [],
};
export default config;
