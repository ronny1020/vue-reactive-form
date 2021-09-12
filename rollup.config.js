import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import copy from 'rollup-plugin-copy'
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
      typescript({ tsconfigOverride: { compilerOptions: { declaration: false } } }),
      commonjs(),
      resolve(),
      sourceMaps(),
      terser(),
      copy({
        targets: [
          { src: 'README.md', dest: 'build' },
          { src: 'package.json', dest: 'build' },
        ],
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: path.resolve(buildPath, pkg.typings), format: 'es' }],
    external: dependencies,
    plugins: [dts()],
  },
]
