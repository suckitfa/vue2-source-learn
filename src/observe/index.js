class Observer {
  constructor(data) {
    // 对数据中的每个属性进行劫持
    // Object.defineProperty只能劫持已经存在属性，新增或者删除的不知道
    // vue需要对这个问题进行打补丁: $set, $delete
    this.walk(data)
  }

  // 循环对象，对属性进行以此劫持
  walk(data) {

    // 重新定义属性：性能瓶颈
    Object.keys(data).forEach( key => defineReactive(data,key,data[key]))
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
  // 如果一个对象别劫持了，就不需要再次被劫持
  // （判断一个对象是否被劫持过,判断是否被劫持过）
  return new Observer(data);
}