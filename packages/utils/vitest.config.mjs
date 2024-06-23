import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/index.ts', '**/*types.ts', '**/*.{spec,test}.{ts,tsx}'],
    },
    exclude: [...configDefaults.exclude, '**/node_modules/**'],
  },
});
