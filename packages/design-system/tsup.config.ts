import { Options } from 'tsup';

const options: Options = {
  format: ['cjs', 'esm'],
  clean: true,
  sourcemap: 'inline',
  dts: true,
  entryPoints: ['src/index.ts'],
  external: ['react', 'react-dom'],
  minify: true,
};

export default options;
