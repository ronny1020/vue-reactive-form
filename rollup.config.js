import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json')

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      name: 'vueReactiveForm',
      format: 'umd',
      sourcemap: true,
      exports: 'named',
      globals: {
        vue: 'vue',
      },
    },
    { file: pkg.module, format: 'es', sourcemap: true, exports: 'named' },
  ],
  external: ['vue'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    typescript({ useTsconfigDeclarationDir: true, tsconfig: 'tsconfig.production.json' }),
    commonjs(),
    resolve(),
    sourceMaps(),
  ],
}
