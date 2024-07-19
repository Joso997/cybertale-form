import vue from 'rollup-plugin-vue';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'esm',
      file: 'dist/index.mjs',
    },
    {
      format: 'cjs',
      file: 'dist/index.cjs',
    }
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({
      extensions: ['.js', '.ts', '.vue']
    }),
    commonjs(),
    typescript(),
    vue()
  ],
  external: ['vue']
};
