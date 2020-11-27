import babel from "@rollup/plugin-babel";
// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser'
// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    typescript({ lib: ["es5", "es6", "dom"], target: "es5" }),
    babel({ babelHelpers: 'bundled' }),
    // // 解析依赖的模块路径
    // resolve(),
    // // 将 commonjs模块转成es6模块
    // commonjs(),
    // es兼容
    // babel({
    //   exclude: 'node_modules/**',
    //   babelHelpers: 'bundled'
    // }),
    // 压缩 (uglify不支持es6语法)
    terser({
      // 仅输出ascii字符
      output: {
        ascii_only: true
      },
      // 去掉console.log函数
      compress: {
        pure_funcs: ['console.log']
      }
    })
  ]
};