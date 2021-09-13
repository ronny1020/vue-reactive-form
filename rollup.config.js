import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json')

const buildPath = path.resolve(__dirname, 'build')

const dependencies = Object.keys(pkg.dependencies)

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: buildPath,
        format: 'es',
        preserveModules: true,
        sourcemap: true,
        exports: 'named',
      },
    ],
    external: dependencies,
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            target: 'es5',
          },
          exclude: ['node_modules', 'example', 'tests'],
        },
      }),
      commonjs(),
      resolve(),
      sourceMaps(),
      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.typings, format: 'es' }],
    external: dependencies,
    plugins: [dts()],
  },
]
