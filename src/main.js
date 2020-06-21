// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as PIXI from 'pixi.js'
import axios from 'axios'
axios.defaults.baseURL = "/api"
window.PIXI = PIXI;
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
// vue.$http = 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
