// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

new Vue({ //配置对象的属性都是固定的属性名
  el: '#app',
  components: {App},
  template: '<App/>',
  router
})



