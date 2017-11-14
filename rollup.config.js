import { minify } from 'uglify-es';
import uglify from 'rollup-plugin-uglify';
import shebang from 'rollup-plugin-shebang';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default [{
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
