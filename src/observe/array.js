// 重写数组中的变异方法
let oldArrayProto = Array.prototype;
export let newArrayProto = Object.create(oldArrayProto)

// 拦截以下变异方法: 能够改变原来数组的方法
let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'reverse',
  'sort'
]
methods.forEach(method => {
  newArrayProto[method] = function(...args) {
    // 函数的劫持，切片编程AOP,添加自己的功能
    const result = oldArrayProto[method].call(this,...args);
    let inserted;
    let ob = this.__ob__;
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2)
        break;
      default:
        break;
    }
    
    // 新增数据
    if (inserted) {
      ob.observeArray(inserted)
    }
    return result;
  }
})
