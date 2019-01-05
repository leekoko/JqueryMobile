

### 数据代理

M：在vue中，为什么vm可以对属性进行设置和读取呢？

```JavaScript
const vm = new MVVM({
  el: "#test",
  data: {
    name: '张三2'
  }
})
console.log(vm.name)  // 读取的是data中的name,  vm代理对data的读操作
vm.name = '李四2' // 数据保存到data中的name上, vm代理对data的写操作
console.log(vm.name, vm._data.name)
```

Z：通过调试源码可以知道

```javascript
/*
相关于Vue的构造函数
 */
function MVVM(options) {
  // 将选项对象保存到vm
  this.$options = options;
  // 将data对象保存到vm和datq变量中
  var data = this._data = this.$options.data;
  //将vm保存在me变量中
  var me = this;
  // 遍历data中所有属性
  Object.keys(data).forEach(function (key) { // 属性名: name
    // 对指定属性实现代理
    me._proxy(key);
  });
  // 对data进行监视
  observe(data, this);
  // 创建一个用来编译模板的compile对象
  this.$compile = new Compile(options.el || document.body, this)
}
```

构造函数的_proxy方法，内置了一个getter setter方法。通过监视data的操作可执行相应的方法

```javascript
MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  // 对指定属性实现代理
  _proxy: function (key) {
    // 保存vm
    var me = this;
    // 给vm添加指定属性名的属性(使用属性描述)
    Object.defineProperty(me, key, {
      configurable: false, // 不能再重新定义
      enumerable: true, // 可以枚举
      // 当通过vm.name读取属性值时自动调用
      get: function proxyGetter() {
        // 读取data中对应属性值返回(实现代理读操作)
        return me._data[key];
      },
      // 当通过vm.name = 'xxx'时自动调用
      set: function proxySetter(newVal) {
        // 将最新的值保存到data中对应的属性上(实现代理写操作)
        me._data[key] = newVal;
      }
    });
  }
};
```

