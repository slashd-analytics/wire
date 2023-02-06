import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/slashd-wire.min.js',
    format: 'umd',
    name: 'SlashdWire',
    sourcemap: false
  },
  watch: {
    exclude: 'dist/*',
    include: 'src/**'
  },
  plugins:[
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    terser(),
    commonjs()
  ]
}
