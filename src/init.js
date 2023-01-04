import { initState } from "./state"
export function initMixin(Vue) {
  // 初始化文件
  Vue.prototype._init = function(options) {
    // vm.$options 获取用户的配置,从Vue的实例中获取
    const vm = this
    vm.$options = options // 将用户的选项挂在到实例上

    // 初始化状态
    initState(vm)
  }
}
