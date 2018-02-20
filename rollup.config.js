import { minify } from 'uglify-es';
import uglify from 'rollup-plugin-uglify';
import shebang from 'rollup-plugin-shebang';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const indexEntryPoints = [{
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  external: ['path', 'child_process'],
  plugins: [
    resolve(),
    commonjs(),
    uglify({}, minify),
  ],
}, {
  input: 'index.js',
  output: {
    file: 'dist/cli.js',
    format: 'cjs',
  },
  external: ['path', 'child_process'],
  plugins: [
    resolve(),
    commonjs(),
    uglify({}, minify),
    shebang(),
  ],
}];

const cleanupEntryPoints = [{
  input: 'cleanup.js',
  output: {
    file: 'dist/cleanup.js',
    format: 'cjs',
  },
  external: ['os', 'fs', 'path'],
  plugins: [
    resolve(),
    commonjs(),
    uglify({}, minify),
  ],
}, {
  input: 'cleanup.js',
  output: {
    file: 'dist/cleanup-cli.js',
    format: 'cjs',
  },
  external: ['os', 'fs', 'path'],
  plugins: [
    resolve(),
    commonjs(),
    uglify({}, minify),
    shebang(),
  ],
}, {
  input: 'cleanup-test.js',
  output: {
    file: 'dist/cleanup-test.js',
    format: 'cjs',
  },
  external: ['os', 'fs', 'path', 'child_process'],
  plugins: [
    resolve(),
    commonjs(),
    uglify({}, minify),
  ],
}];

export default [...indexEntryPoints, ...cleanupEntryPoints];
