# webpack   

## Vue.js应用创建   

### vue-cli3创建

vue-cli3可以使用``vue create [项目名]``命令初始化，模板是固定的。

### vue-cli2创建

M：vue怎么通过cli2创建应用呢？

Z：使用``vue init webpack vue-one  ``即可，webpack是官方推荐的标准模板，vue-one是项目名

M：创建项目时候的询问怎么选？

Z：以下为no，其他皆为默认

```
Set up unit tests No
Setup e2e tests with Nightwatch? (Y/n) n
```

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

## html转vue

在html中可以写vue代码，但当代码搬到vue文件时，写法有一些转变。

### 基础结构改变

html中，将操作直接在``new Vue``对象里编写

vue中，所有内容需要放在``<template>``标签里。操作在``export default ``里编写。（标识提供接口给外界调用，而在main.js文件中就通过new Vue调用了该接口）

### 组件转化

html写法

```html
Vue.component('todo-item',{
    props: ['item'],
    template: '<li class="item">{{item}}</li>'
})
```

vue写法：引入后声明

```vue
import TodoItem from './components/TodoItem.vue'
export default{
...
  components: {
    TodoItem
  }
...
}
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

## 项目打包

M：怎么打包发布项目呢？

Z：静态服务器发布：

1. 使用``npm run build``命令打包
2. 用``npm install -g serve``安装静态服务器
3. 用``serve dist``发布到静态服务器

动态服务器发布：

1.  修改生产环境webpack.prod.conf.js文件的output，往里面添加：

   ```javascript
   publicPath:'/vue_demo/'
   ```

2. 重新打包``npm run build``之后，再将打包的文件disk改名为vue_demo,将该文件复制到tomcat的webapp即可进行发布。

M：eslint检查太烦人，怎么先忽略掉，日后一起修改？

Z：在``.eslintignore``文件夹中添加``*.js``和``*.vue``即可。

## 新建项目

M：新建静态组件的步骤是怎么样呢？

Z：如下

1. 创建main.js，App.vue，/components文件夹和里面的vue结构文件；编写main.js文件的基础内容；在index.html中引入样式文件。

2. 拆分页面：在App.vue中引入vue文件，映射成标签使用

   ```javascript
   import Add from './components/Add.vue'
   
   export default{
       components{
       	Add
   	}
   }
   ```

   ```html
   <Add/>
   ```

3. 拆分样式：将对应的样式添加到其vue中    

## 项目部署   

M：怎么测试实际项目的数据呢，而并非demo数据。

Z：需要将项目部署到正式环境上，部署的方式如下：

1. 在IDE上设置FTP连接，账号为eda，密码为123456；并且设置Mapping的Local path为dist目录
2. build项目
3. 右键项目，直接将整个项目推送到服务器上 













慕课视频

https://www.imooc.com/video/16402

















