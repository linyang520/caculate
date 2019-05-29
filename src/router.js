import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'

Vue.use(VueRouter)

export default new VueRouter({
  // mode: 'history',
  linkActiveClass: 'isActive',
  routes: [
    {path: '/', component: Index, meta: {title: '可转债收益计算器', index: 0}}
  ]
})
