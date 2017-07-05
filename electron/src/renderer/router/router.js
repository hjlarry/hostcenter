import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Hosts from '@/components/host/Hosts'
import HostForm from '@/components/host/HostForm'
import LocalHost from '@/components/LocalHost'
import store from '../store/store'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/localhost',
      name: 'LocalHost',
      component: LocalHost
    },
    {
      path: '/hosts',
      name: 'Host',
      component: Hosts
    },
    {
      path: '/myhost',
      name: 'MyHost',
      meta: {
        requireAuth: true,
      },
      component: Hosts
    },
    {
      path: '/newhost',
      name: 'Newhost',
      meta: {
        requireAuth: true,
      },
      component: HostForm
    },
    {
      path: '/hosts/:id',
      name: 'HostContent',
      meta: {
        requireAuth: true,
      },
      component: HostForm
    }
  ]
})
if (window.localStorage.getItem('token')) {
  store.commit('LOGIN_TOKEN', window.localStorage.getItem('token'))
}
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.auth.token) {// 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})


export default router
