import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from "./router"
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'


Vue.use(Element)

//设置反向代理，前段请求默认发送到 http://localhost:8080
axios.defaults.baseURL = 'http://localhost:8443'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
