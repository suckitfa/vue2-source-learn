import { observe } from "./observe/index"
// 初始化状态
export function initState(vm) {
  const opts = vm.$options
  // 初始化数据
  if(opts.data) {
    initData(vm)
  }
}

// 代理函数：主要实现原理就是使用defineProperty来改写get函数
function proxy(vm,target,key) {
  Object.defineProperty(vm,key, {
    // vm.name
    get() {
      return vm[target][key]; // vm._data.name
    },
    set(newValue) {
      vm[target][key] = newValue
    }
  })
}

// 初始化数据：代理，进行响应式拦截
function initData(vm) {
  // data可能是函数或者对象
  let data = vm.$options.data
  data = typeof data === 'function' ? data.call(vm):data
  vm._data = data;
  // 对数据记性劫持
  observe(data)

  // 将vm._data用vm来代理
  for(let key in data) {
    proxy(vm,'_data',key);
  }
}