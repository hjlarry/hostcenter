// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from './axios'
import Vuex from 'vuex'
import store from './store/store'
import './assets/bootstrap.min.css'


Vue.use(Vuex)



Vue.config.productionTip = false




new Vue({
  el: '#app',
  axios,
  router,
  store,
  template: '<App/>',
  components: { App }
})
