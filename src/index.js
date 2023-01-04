import { initMixin } from "./init";

// 将所有的方法都耦合在一起
function Vue(options) {
  // options是用户的选项
  this._init(options)
}

initMixin(Vue); // 扩展init方法

export default Vue;