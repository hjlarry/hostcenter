import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import store from './store/store'
import router from './router/router'



Vue.use(VueAxios,axios)

axios.defaults.timeout = 5000;

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://host.dev/api/';
} else {
  axios.defaults.baseURL = 'http://106.14.8.251/api/';
}


axios.interceptors.request.use(
  config => {
    if (store.state.auth.token) {
      config.headers.Authorization = `Bearer ${store.state.auth.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('LOGOUT');
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  });


export default axios
