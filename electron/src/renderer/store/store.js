import Vue from 'vue'
import Vuex from 'vuex'


import host from './module/host'
import auth from './module/auth'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    host,
    auth
  }
})
