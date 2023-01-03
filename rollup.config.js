import babel from 'rollup-plugin-babel'
// 默认导出一个对象，作为配置
export default {
  // 入口
  input:'./src/index.js',
  // 出口
  output: {
    file:'./dist/vue.js',
    name:'Vue', // global.Vue 全局挂在
    format:'umd', // esm es6模块 commonjs模块（node中使用的） iife自主性函数  umd （兼容commonjs amd）
    sourcemap:true, // 开启源码调试
  },
  plugins:[
    babel({
      exclude:'node_modules/**' // 排除node_modules所有文件
    })
  ]
}