import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      provider: 'istanbul',
      exclude: [
        '**/index.ts',
        '**/constants.ts',
        '**/*.stories.tsx',
        '**/*.styles.ts',
        '**/*.config.js',
        '**/*types.ts',
        '**/*.{spec,test}.{ts,tsx}',
      ],
    },
    exclude: [...configDefaults.exclude, '**/node_modules/**'],
  },
});
