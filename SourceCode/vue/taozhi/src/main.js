// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from './components/goods/goods'
import ratings from './components/ratings/rating'
import seller from './components/seller/seller'

Vue.use(VueRouter) //安装插件

let app = Vue.extend(App);

let router = new VueRouter();


/*
new Vue({ //配置对象的属性都是固定的属性名
  el: '#app',
  components: {App},
  template: '<App/>',
  router
})
*/

router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
})

router.start(app, '#app')

router.go('ratings')


