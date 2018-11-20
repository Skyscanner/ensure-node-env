import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

// 'events' and 'util' are used by the 3rd party `commander` package
const COMMON_IMPORTS = ['path', 'child_process', 'os', 'fs', 'events', 'util'];
const COMMON_PLUGINS = [resolve(), commonjs(), terser()];

export default [
  {
    input: 'index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    external: COMMON_IMPORTS,
    plugins: COMMON_PLUGINS,
  },
  {
    input: 'index.js',
    output: {
      file: 'dist/cli.js',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
    external: COMMON_IMPORTS,
    plugins: COMMON_PLUGINS,
  },
];
