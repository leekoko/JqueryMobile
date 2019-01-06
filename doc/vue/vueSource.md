

### 1.数据代理

M：什么是数据代理呢？

Z：``name: '张三2'``只是定义在vm中，但是却可以通过vm来获取和设置name的值。因为vue对name做了数据代理。

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

Z：构造函数的源码如下

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

### 2.模板解析

M：什么是模板解析呢？

Z：在data中定义的值，可以对应渲染到html标签的{{name}}文本标识中

```html
<div id="test">
  <p>{{name}}</p>
</div>
```

```javascript
  new MVVM({
    el: '#test',
    data: {
      name: 'SADAMU'
    }
  })
```

Z：MVVM构造函数的源码有一段编译代码

```javascript
this.$compile = new Compile(options.el || document.body, this)
```

```javascript
function Compile(el, vm) {
  // 保存vm
  this.$vm = vm;
  // 保存el元素
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);  //获取元素节点
  // 如果el元素存在
  if (this.$el) {
    // 1. 取出el中所有子节点, 封装在一个framgment对象中
    this.$fragment = this.node2Fragment(this.$el);
    // 2. 编译fragment中所有层次子节点
    this.init();
    // 3. 将fragment添加到el中
    this.$el.appendChild(this.$fragment);
  }
}
```

这段代码就是将vm定义的内容转化为标签，存储到内存中，然后推送到前端进行显示

M：它是怎么将vm的内容转化为标签的呢？

Z：``this.node2Fragment(this.$el);``新建一个fragment对象，将el中的结点添加到fragment中

```javascript
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }

    return fragment;
  }
```

它的三个结点分别是两个回车和一个p标签；然后在``this.init();``主要执行了compileElement方法

```javascript
  compileElement: function (el) {
    // 得到所有子节点
    var childNodes = el.childNodes,
      // 保存compile对象
      me = this;
    // 遍历所有子节点
    [].slice.call(childNodes).forEach(function (node) {
      // 得到节点的文本内容
      var text = node.textContent;
      // 正则对象(匹配大括号表达式)
      var reg = /\{\{(.*)\}\}/;  // {{name}}
      // 如果是元素节点
      if (me.isElementNode(node)) {
        // 编译元素节点的指令属性
        me.compile(node);
        // 如果是一个大括号表达式格式的文本节点
      } else if (me.isTextNode(node) && reg.test(text)) {
        // 编译大括号表达式格式的文本节点
        me.compileText(node, RegExp.$1); // RegExp.$1: 表达式   name
      }
      // 如果子节点还有子节点
      if (node.childNodes && node.childNodes.length) {
        // 递归调用实现所有层次节点的编译
        me.compileElement(node);
      }
    });
  },
```

初始化做的事就是获取结点的内容，然后正则匹配。如果存在子节点，还需要递归本方法处理子节点。

M：`` var reg = /\{\{(.*)\}\}/;``中的括号有什么作用？

Z：子匹配，匹配出{{表达式}}中的表达式，并且将匹配到的内容存到RegExp的$容器中

M：为什么要判断正则{{文本}}结点还是元素节点呢？

Z：因为除了解析{{表达式}}，还要解析v-text指明表达式；判断就是为了区分，分别处理。

M：编译大括号``me.compileText(node, RegExp.$1);``是怎么做的呢？

Z：主要就是调用了bind方法，根据编译结点的类型解析指令

```javascript
  // 真正用于解析指令的方法
  bind: function (node, vm, exp, dir) {
    /*实现初始化显示*/
    // 根据指令名(text)得到对应的更新节点函数
    var updaterFn = updater[dir + 'Updater'];
    // 如果存在调用来更新节点
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));  //左边存在，调用函数

    // 创建表达式对应的watcher对象
    new Watcher(vm, exp, function (value, oldValue) {/*更新界面*/
      // 当对应的属性值发生了变化时, 自动调用, 更新对应的节点
      updaterFn && updaterFn(node, value, oldValue);
    });
  },
```

``this._getVMVal(vm, exp)``做的是根据name获取到定义的值；获取更新结点的函数，调用该更新函数

```javascript
var updater = {
  // 更新节点的textContent
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },
  ...
```

对结点内容进行更新

M：``new Watcher``是干嘛用的？

Z：为后面的更新做准备工作。



视频53

