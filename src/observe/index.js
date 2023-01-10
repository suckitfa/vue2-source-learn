import { newArrayProto } from "./array"
class Observer {
  constructor(data) {
    // 给数据加了标识
    Object.defineProperty(data,"__data__", {
      value:this,
      // 循环的时候不可以被枚举到
      enumerable:false,
    })
    // 对数据中的每个属性进行劫持
    // Object.defineProperty只能劫持已经存在属性，新增或者删除的不知道
    // vue需要对这个问题进行打补丁: $set, $delete
    if(Array.isArray(data)) {
      // 重写数组中的方法，7个变异方法，是可以修改数组本身的
      // 保留原数组的特性
      data.__proto__ = newArrayProto
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }

  // 循环对象，对属性进行以此劫持
  walk(data) {
    // 重新定义属性：性能瓶颈
    Object.keys(data).forEach( key => defineReactive(data,key,data[key]))
  }

  observeArray(data) {
    data.forEach(item => observe(item))
  }
}

// 响应式定义
export function defineReactive(target,key,value) {
  // 对所有的对象都进行属性劫持
  observe(value);
  //闭包：当前变量不会被销毁
  Object.defineProperty(target,key,{
    // 读取的时候执行
    get() {
      return value
    },
    // 修改的时候执行
    set(newValue) {
      if(newValue === value)  {
        return;
      }
      // 再次代理
      observe(newValue)
      value = newValue
    }
  })
}

// 观察者
export function observe(data) {
  // 只对对象进行劫持
  if(typeof data !== 'object' || data == null) {
    return; 
  }
  // 说明对象被代理了
  if(data.__ob__ instanceof Observer) {
    return data.__ob__;
  }
  // 如果一个对象别劫持了，就不需要再次被劫持
  // （判断一个对象是否被劫持过,判断是否被劫持过）
  return new Observer(data);
}