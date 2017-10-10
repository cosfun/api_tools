import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index/index'
import persional from '@/components/info/persional'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: index
    },
    {
      path: '/',
      component: index
    },
    {
      path:'/set',
      component:persional
    }
  ]
})
