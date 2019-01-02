# webpack   

## Vue.js应用创建   

M：vue怎么创建应用呢？

Z：使用``vue init webpack vue-one  ``即可，webpack是模板名称，vue-one是项目名

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















