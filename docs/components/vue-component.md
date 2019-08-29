# VUE组件

## 纯组件

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

相当于定义一个自定义标签，然后调用该标签就可以了，渲染之后就变为模板的内容。

也可以直接将模板写成一个文件，通过impor的方式引入，TodoItem.vue文件如下：

```vue
<template>
    <li class="item">{{item}}</li>
</template>

<script>
    export default {
        props: ['item'],
        name: "TodoItem"
    }
</script>

<style scoped>
    .item{
        color: red;
    }
</style>
```

```js
import TodoItem from './components/TodoItem.vue'
export default{
...
  components: {
    TodoItem
  }
...
}
```

## 带函数组件

组件中如果有data数据，需要添加data函数：

```javascript
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

## 多行模板组件

（用多行模板组件，还不如直接引入vue文件更加便捷）

M：模板的定义如果是多个标签组合，该怎么实现呢？

Z：用``\``做行连接符，如下代码：

```javascript
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})
```

M：简单说就是给模板不同的位置设置为变量，如果不想让变量发生再次改变，怎么做？

Z：使用v-once属性即可``  template: '<li v-once>{{ todo }}</li>'``

Z：任何类型的应用界面都可以抽象为组件树，在大的组件中套用小的组件。整个前端项目 = 组件不断嵌套堆叠

## 带参数组件

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
  props: ['todo'],  //声明变量名
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

给模板标签绑定一个属性``v-bind:todo="item"``（简写为``:todo="item"``），而模板声明接收该todo属性

## 多个参数组件

M：如果要传的是多个参数，怎么实现实时更新呢？

Z：父组件传输方式如下：

```html
<eda-attachment :busiId.sync="infoData.attachCode" :busiType.sync="busiType"></eda-attachment>
```

子组件接收参数之后，watch检测参数变化情况

```javascript
watch: {
    busiId() {
        this.infoData = {};
        this.initAttach();
    }
}
```

## 组件核心概念

组件的所有核心概念都是属性的形式进行传递。

### 1.插槽

插槽分为：

- 普通插槽
- 作用域插槽

通过v-bind绑定的数据，有一些标签内容是无法传过去的。插槽可以传输任何参数内容。

将v-bind转化为插槽的方式:

1. 去掉``v-bind``属性，添加``<template>``标签

   ```vue
   <todo-item v-for="item in list" :key="item">
       <template>
   		<span :style="{fontSize: '20px'}">{{item}}</span>
       </template>
   </todo-item>
   ```

2. 在模板位置添加接收标签``<slot>``，即可接收传入内容

   ```vue
   <slot></slot>
   ```

#### 插槽返回参数

如果我现在用某个组件，需要获取到该组件的交互信息。就要让组件返回响应参数：

1. 将组件中的插槽标签绑定一个对象

   ```vue
   <slot name="item" v-bind="{checked}"></slot>
   ```

2. 添加插槽name，在template上添加``v-slot:{插槽名}=“{接收对象命名}”``属性，就可以获取到插槽返回 的值。

### 2.属性

属性可分为：

- 自定义属性props
- 原生属性attrs：自动挂载根元素上（像title），可设置inheritAttrs为false关闭
- 特殊属性class，style：挂载根元素上

子组件没法直接修改父组件传过来的值，需要用别的方式实现

### 3.事件

事件可分成：

- 普通事件：@click，@input...触发
- 修饰符事件：@input.trim，@click.stop（阻止冒泡），用于原生html

