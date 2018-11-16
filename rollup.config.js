import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    external: ['path', 'child_process', 'os', 'fs', 'events', 'util'],
    plugins: [resolve(), commonjs(), terser()],
  },
  {
    input: 'index.js',
    output: {
      file: 'dist/cli.js',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
    external: ['path', 'child_process', 'os', 'fs', 'events', 'util'],
    plugins: [resolve(), commonjs(), terser()],
  },
];
