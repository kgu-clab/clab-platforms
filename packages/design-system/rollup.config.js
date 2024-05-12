import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import packageJson from './package.json';

function createPostCSS() {
  return postcss({
    config: {
      path: './postcss.config.js',
    },
    extensions: ['.css'],
    minimize: true,
    inject: {
      insertAt: 'top',
    },
  });
}

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      createPostCSS(),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      terser(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [createPostCSS(), dts.default()],
  },
];

export default config;
