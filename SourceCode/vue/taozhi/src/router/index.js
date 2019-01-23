import Vue from 'vue'
import Router from 'vue-router'
import seller from '../components/seller/seller'
import home from '../view/home'
import iView from "iview";

Vue.use(iView);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/',
      redirect: '/seller'
    }
  ]
})
