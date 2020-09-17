import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import home from '@/components/pages/home'
import kinds from '@/components/pages/kinds'
import car from '@/components/pages/car'
import mine from '@/components/pages/mine'
import login from '@/components/login/login'
import register from '@/components/login/register'
import yao from '@/components/yemian/yao'
import orderDetails from '@/components/yemian/orderDetails'
import password from '@/components/yemian/password'
import myOrder from '@/components/yemian/myOrder'
import evaluate from '@/components/yemian/evaluate'
import goodsDetail from '@/components/yemian/goodsDetail'
Vue.use(Router)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage,
      children:[
        {
          path:'/home',
          name: 'home',
          component:home,
        },
        {
          path:'/kinds',
          name: 'kinds',
          component:kinds,
        },
        {
          path:'/car',
          name: 'car',
          component:car,
        },
        {
          path:'/mine',
          name: 'mine',
          component:mine,
        },
      ]
    },
    {
      path: '/yao',
      name: 'yao',
      component: yao,
    },
    {
      path: '/password',
      name: 'password',
      component: password,
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: orderDetails,
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder,
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: evaluate,
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: goodsDetail,
    },
    
 
  ]
})
