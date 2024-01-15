import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@api', replacement: 'src/api' },
      { find: '@assets', replacement: 'src/assets' },
      { find: '@components', replacement: 'src/components' },
      { find: '@constants', replacement: 'src/constants' },
      { find: '@hooks', replacement: 'src/hooks' },
      { find: '@mocks', replacement: 'src/mocks' },
      { find: '@pages', replacement: 'src/pages' },
      { find: '@router', replacement: 'src/router' },
      { find: '@store', replacement: 'src/store' },
      { find: '@styles', replacement: 'src/styles' },
      { find: '@types', replacement: 'src/types' },
      { find: '@utils', replacement: 'src/utils' }
    ]
  }
});
