// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import components from './components'
import toastRegistry from './components/Toast/index'

// 定义全局变量
// import {post, get} from './api/http'
// Vue.prototype.$post = post
// Vue.prototype.$get = get
// Vue.prototype.$ajax = axios

// 模拟数据 start
// import axios from 'axios'
// import baseUrl from '../config/baseUrlBase'
// require('./mock/index.js')
// require('../config/baseUrlBase')
// Vue.prototype.$axios = axios
// 模拟数据 end

Vue.use(components)
Vue.use(toastRegistry)
Vue.config.productionTip = true

// 是否取消Vue所有的日志和警告
Vue.config.silent = true

// vue-style-loader!css-loader
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
