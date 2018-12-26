# Vue.js

[TOC]

## 为什么要使用Vue.js

Z：vue.js的有点如下：

- vue.js将前端的设计，从关注DOM转移到关注数据上

- data属性值发生变化时，会自动更新（前提是该属性存在，默认值也行）

  使用``Object.freeze(属性)``可以阻止值被更新

  ```javascript
  var obj = {mess:"不改变的内容"};
  Object.freeze(obj)
  ```


## Vue.js应用创建   

M：vue怎么创建应用呢？

Z：使用``vue init webpack vue-one  ``即可

启动方式：

```
# 安装依赖，使用淘宝资源命令 cnpm
cnpm install

# 进入项目所在目录，启动应用，地址为 localhost:8080
cnpm run dev
```

Z：vue的基础目录结构如下：

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
│   ├── components                              // 组件
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── index.html                                  // 入口html文件
.
```

### 1.App.vue   

Z：App.vue的最基础形式如下：

App.vue中可以写`` <template>`` 、``js``、``<style>``， 其中必须要有export default 来表示对外输出本模块

```vue
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: "app"
};
</script>
```

### 2.main.js

Z：main.js是初始化vue实例并使用需要的插件，main.js的最基础形式如下：

首先引入了Vue库和App.vue，创建了一个vue实例，template 和 components 写入相应的组件，并且选择要挂载的元素

```vue
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

M：bootstrap的引入也是在该页面

## 语法

### 1.指令

#### v-bind

Z：指令带有``v-``,例如以下实例

```html
<div id="app-2">
  <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
</div>
```

```javascript
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date().toLocaleString()
  }
})
```

v-bind:捆绑指令，渲染DOM时，将title特性和vue实例中的message属性保持一致

M：那如果我要修改属性值呢?

Z：只要执行``app2.message = '新消息';``js语句，message属性将会被修改。   

M：``v-bind:title="message"``最后会被渲染为``title="message的变量内容"``，这里title的属性变化相当于attr的作用。

_<a v-bind:href="url">可以缩写为<a :href="url">_  

#### v-if

M：我们之前要控制元素是否显示，使用js的判断，控制元素的display属性，而在vue中怎么使用呢？

Z：如下所示：

```html
<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
```

```javascript
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

v-if判断变量seen的属性值，如果值为false，数据将消失，否则正常显示。

M：这里的属性切换是导致元素直接remove/add，并非简单的隐藏。

#### v-for

M：对于列表的前端显示，我们一般会使用EL表达式的``<c:forEach>``语句，在vue中怎么实现呢？

Z：实现代码如下：

```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```javascript
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
  }
})
```

在渲染时，添加了v-for的li将会被复制多份，传过来的内容是一个数组

M：如果要往数组中新增内容，怎么实现呢？

Z：使用``app3.todos.push({ text: '新项目' })``即可往数组中追加内容

#### v-on   

M：如果我们要做按钮，一般就是添加onclik属性，然后在js中添加该方式，在vue中怎么实现呢？

Z：如下代码：

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">逆转消息</button>
</div>
```

```javascript
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

用v-on监听click事件，指定方法名。将方法添加到vue实例的methods属性中

_<a v-bind:href="url">可以缩写为<a :href="url">_  

#### v-model

M：我想实现显示栏实时显示输入框的内容，一般用到onkeyup监听键盘，每次都执行attr方法替换显示的标签内容。怎么vue中怎么实现呢？

Z：代码如下：

```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```javascript
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

vue通过v-model方法双向绑定vue变量&输入框，vue变量值变化，显示内容则实时更新。

### 2.钩子

Z：实例的创建也存在生命周期，我们可以在不同的生命周期执行不同的代码，叫做生命周期钩子函数。常见的钩子函数有：如 mounted、updated和 destroyed

#### created

M：vue中created钩子函数使用方式如下：

```javascript
var vm = new Vue({
  el: '#app-7',
  data: {mess:"内容"};,
  created: function () {
    // `this` 指向 vm 实例
    alert("创建时调用");
  }
})
```

### 3.属性

#### computed计算属性  

M：如果我们要实现对一个值的调整，需要获取那个原值，处理之后再做显示。这样子做不到原值变化的时候生成值同步更新。vue是怎么实现的呢？

Z：代码如下：

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

直接用{{变量名}}获取该变量名reversedMessage下的函数值（这个函数成为getter函数）；该变量为message转化而来，message一变，reversedMessage也将随之改变。

_computed属性 = 方法功能 + 侦听功能 + 缓存功能_  

#### methods方法属性

Z：方法属性的使用跟计算属性基本一致，代码如下：

```html
{{ reversedMessage() }}   <!--方法需要加() -->
```

```javascript
var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello'
    },
    // 在组件中
    methods: {
        reversedMessage: function () {
            return this.message.split('').reverse().join('')
        }
	}
})
```

M：既然如此，为什么不统一使用methods呢？

Z：主要是使用场景的问题，computed是基于原数据进行计算的，计算完之后会对结果进行缓存；下次调用将不再执行getter函数，直至原数据更新才再次调用。

而methods则是每次都执行一遍，相比之下，computed更加节省资源。

#### watch侦听属性

Z：watch除了可以用``vm.$watch('mess', function (newValue, oldValue) {...``来编写实例方法，还可以用以下方式实现：

```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

对firstName和lastName分别进行侦听；因为这个侦听属性也是基于原数据进行处理，所以也可以用computed计算属性代替

```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {    <!-- 此处定义fullName -->
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

M：fullName是computed下定义的变量，自带getter方法，所以data中无需再定义fullName。问题是如果我要改变fullName的值需要怎么做呢？

Z：扩展fullName的setter方法，代码如下：

```javascript
  computed: {
    fullName: {
		get: function () {
			return this.firstName + ' ' + this.lastName
		},
		set: function(newValue){
		  var names = newValue.split(',')
		  this.firstName = names[0]
		  this.lastName = names[names.length - 1];
		}
	}
  },
```

```javascript
vm.fullName = '111111,22222';
```

直接给fullName赋值即可调用set方法

M：如果我想用侦听器侦听输入的内容，然后访问api；但是又不想变化一次就输入一次，怎么设置多次变化的访问频率呢？

Z：分析以下一个demo:

```vue
<script src="https://unpkg.com/vue"></script>

<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
	
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
</script>
```

这里用到了debounce进行频率的控制，每500ms才会尝试一次访问。访问通过``axios.get('https://yesno.wtf/api')``获取到response后对其内容进行解析显示。







## vue自带实例

Z：在vue中，系统暴露了一些自带的属性了实例，用``$``前缀与用户自定义属性进行区分。

#### $watch

M：怎么一直监听某个变量的变化？

Z：代码如下：

```javascript
var obj = {mess:"即将被改变的内容"};
```

```javascript
// $watch 是一个实例方法
vm.$watch('mess', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
  alert("发现啦，你改变了");
})
```



## 组件

#### 组件使用

M：如果是相同的代码段，我们一般就是复制很多份，在vue中要怎么将其多次重复呢？

Z：使用组件模板的方式，代码如下

```html
<div id="app-7">
	<ol>
	  <!-- 创建一个 todo-item 组件的实例 -->
	  <todo-item></todo-item>
	  <todo-item></todo-item>
	</ol>
</div>
```

```javascript
// 定义名为 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})
var app7 = new Vue({
	el: '#app-7'
})
```

相当于定义一个自定义标签，然后调用该标签就可以了。渲染之后就变为模板的内容。

M：这是当每个模板都一模一样的时候可以使用，但是如果内容有一点不同呢？

Z：如下代码：

```html
<div id="app-7">
  <ol>
    <!--
      现在我们为每个 todo-item 提供 todo 对象
      todo 对象是变量，即其内容可以是动态的。
      我们也需要为每个组件提供一个“key”，稍后再
      作详细解释。
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id">
    </todo-item>
  </ol>
</div>
```

```javascript
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其它什么人吃的东西' }
    ]
  }
})
```

给模板标签绑定一个属性``v-bind:todo="item"``，而模板声明接收该todo属性，并取出属性中的值，写入模板中。

M：简单说就是给模板不同的位置设置为变量，如果不想让变量发生再次改变，怎么做？

Z：使用v-once属性即可``  template: '<li v-once>{{ todo }}</li>'``

Z：任何类型的应用界面都可以抽象为组件树，在大的组件中套用小的组件。整个前端项目 = 组件不断嵌套堆叠







https://cn.vuejs.org/v2/guide/class-and-style.html



