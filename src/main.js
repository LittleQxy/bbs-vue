import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from "./router"
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import Vuex from 'vuex'//导入vuex

Vue.use(Element)
Vue.use(Vuex)

import store from "./store";
//设置反向代理，前段请求默认发送到 http://localhost:8080
axios.defaults.baseURL = 'http://localhost:8443'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
      if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization');
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    });

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
