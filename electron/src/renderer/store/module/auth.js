import Vue from 'vue'

const state = {
  token:''
}

const mutations = {
  'LOGIN_TOKEN'(state,token){
    localStorage.setItem('token', token)
    state.token = token
  },
  'LOGOUT'(state){
    localStorage.removeItem('token');
    state.token = null
  }
}

const actions = {
  login(store,user){
    Vue.axios.post('login',{
      email:user.email,
      password:user.password
    }).then(response =>{
      localStorage.token = response.data.token
      store.commit('LOGIN_TOKEN',response.data.token)
    }).catch(function (error) {
      alert('Please check your email and password')
    })
  },
  logout(store){
    store.commit('LOGOUT')
  },
  register(store,user){
    Vue.axios.post('register',{
      email:user.email,
      password:user.password
    }).then(response =>{
      localStorage.token = response.data.token
      store.commit('LOGIN_TOKEN',response.data.token)
    }).catch(function (error) {
      alert('Register failed, sth. you typed error!')
    })
  }
}

export default {
  state,
  mutations,
  actions
}