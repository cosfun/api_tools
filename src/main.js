// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$http = axios
Vue.prototype.baseUrl="http://127.0.0.1:8087/apitools"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
