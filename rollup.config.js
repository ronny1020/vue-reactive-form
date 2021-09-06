import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json')

export default [
  {
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
    external: [Object.keys(pkg.dependencies)],
    watch: {
      include: 'src/**',
    },
    plugins: [typescript(), commonjs(), resolve(), sourceMaps()],
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.typings, format: 'es' }],
    external: [Object.keys(pkg.dependencies)],
    plugins: [dts()],
  },
]
