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

M：那除了if，有没有else呢？

Z：如下代码

```javascript
	<div v-if="Math.random() > 0.5">
	  Now you see me
	</div>
	<div v-else-if="Math.random() < 0.3">
	  Now you see another me
	</div>
	<div v-else>
	  Now you don't
	</div>
```

M：这里的属性切换是导致元素直接remove/add，并非简单的隐藏。

#### v-show

M：因为有些元素需要频繁显示隐藏，我想在css层面隐藏它，在vue中怎么实现？

Z：如下代码

```html
<div id="demo">
	<div v-show="ok">
	  Now you see me
	</div>
	<div v-show="no">
	  Now you see another me
	</div>
</div>
```

```javascript
var vm = new Vue({
	el: '#demo',
	data: {
	  ok: true,
	  no: false
	}
})
```

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

M：v-if和v-for组合怎么使用？

Z：如果是for中隐藏不显示的列，可以用for循环**计算属性**返回的值，如下代码

```javascript
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {   //filter方法
      return user.isActive
    })
  }
}
```

_尽量避免将for和if写在同一个元素上面``<div v-for="grocery in groceryList" v-if="grocery.isShow">，这样可以使for操作和if操作解耦``_    

如果是通过if判断，是否显示整块列，如下代码：

```html
	<div v-if="flag">
		<div v-for="grocery in groceryList" >
		  <a>{{grocery.text}}</a>
		</div>
	</div>
```

M：如果我有一个对象，但是不知道它的key是什么，要用什么方式把它遍历出来呢？

Z：可以用v-for循环key，value进行显示

```html
<ul id="v-for-object" class="demo">
	<div v-for="(value, key) in object">
	  {{ key }}: {{ value }}
	</div>
</ul>
```

```javascript
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})
```

如果只要value，使用以下代码即可

```HTML
	<div v-for="value in object">
	  {{ value }}
	</div>
```

_在2.2.0+版本中，v-for时key是必须添加的。_

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

#### key属性

M：key属性有模式作用呢，为什么要添加key属性将标签区分开来？

Z：代码如下：

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

在这段代码中，label只被渲染了一次，而用到了两个地方（第二次只是渲染了文本内容）。

而添加了key的input将会被重新渲染，如果不重新渲染，输入在Username中的内容将会保存到Email文本框中。

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

### 4.绑定HTML Class

#### Class绑定

M：如果我想让元素动态地变化属性，一般情况下就是监测改变标签的css样式。在vue中该怎么实现呢？

Z：可以用v-bind绑定class属性，用class绑定css样式；代码如下：

```html
<div v-bind:class="{ active: isActive }"></div>
```

其中isActive是一个布尔值，当isActive值为true时，``class=active``才会被渲染出来。

M：如果我要定义多个类，该怎么实现呢？

Z：通过对的方式传输

```html
<div v-bind:class="classObject"></div>
```

```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

M：如果我现在添加那个类，需要一定的逻辑判断，又要怎么做呢？

Z：将普通属性转变为计算属性

```html
<div id="demo">
	<div v-bind:class="classObject"></div>
</div>
```

```javascript
var vm = new Vue({
	el: '#demo',
	data: {
	  isActive: true,
	  error: null
	},
	computed: {
	  classObject: function () {
		var flagA = this.isActive && !this.error;
		var flagB = false;
		flagB = flagA;
		return {active:flagA ,'text-danger': flagB}
	  }
	}
})
```

#### CSS内联绑定  

M：如果我想把CSS写成内联样式，在vue中该怎么实现呢？

Z：用``v-bind:style``绑定键值对就可以了，代码如下：

```html
<div id="demo">
	<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">内容</div>
</div>
```

```javascript
var vm = new Vue({
	el: '#demo',
	data: {
	  activeColor: 'red',
	  fontSize: 30
	}
})
```

### 5.元素

#### 数组

M：我现在存在一个数组，直接用``arr[0]='new content'``虽然替换成功，当显示的内容并不会响应式更新，怎么解决呢？

Z：使用以下代码即可进行响应式替换：

```javascript
Vue.set(vm.items, 1, "d");
```

#### 对象

M：如果要更新属性的是一个对象，用以下代码虽然成功更新，也不能响应式更新，该怎么做：

```javascript
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

Z：换一种方式：

```javascript
var vm = new Vue({
  el: '#v-for-object',
  data: {
	man:{
		name:'liuXin',
		age : 13
	}
  },
  methods:{
	test:function(){
		vm.man = Object.assign({}, vm.man, {
		  height: 180,
		  favoriteColor: 'Vue Green'
		})
		console.log(this.man);
	}
  }
})
```

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

#### filter方法

M：当有一些数据不想显示出来，一般这种过滤操作都是在后端处理完传到前台的。vue要用什么方式过滤掉呢？

Z：如下代码：

```javascript
  data: {
	numbers: [ 1, 2, 3, 4, 5 ]
  },
  computed: {
	  evenNumbers: function () {
		return this.numbers.filter(function (number) {
		  return number % 2 === 0
		})
	  }
  },
```

实现filter方法，将要显示的数据return到前端。

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

## 规范

### 1.css作用域

Z：为了不让自己写的代码不被第三方或者其他人的HTML/CSS影响，有以下两种方式可以设置样式作用域：

- 使用class策略：添加个前缀``c-``区分，例如以下代码：

  ```vue
  <template>
    <button class="c-Button c-Button--close">X</button>
  </template>
  
  <!-- 使用 BEM 约定 -->
  <style>
  .c-Button {
    border: none;
    border-radius: 2px;
  }
  
  .c-Button--close {
    background-color: red;
  }
  </style>
  ```

- 使用`scoped` 特性

  如``<style scoped>``或``<style module>``

### 2.私有属性名

Z：直接定义属性可能与其他人属性冲突，可以使用``$_spaceName_propertyName``以区分：

```javascript
var myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update: function () {
      // ...
    }
  }
}
```



规范内容后期补充

https://cn.vuejs.org/v2/style-guide/#%E4%BC%98%E5%85%88%E7%BA%A7-B-%E7%9A%84%E8%A7%84%E5%88%99%EF%BC%9A%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90-%E5%A2%9E%E5%BC%BA%E5%8F%AF%E8%AF%BB%E6%80%A7

