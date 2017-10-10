import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index/index'
import persional from '@/components/info/persional'
import project from '@/components/info/project'
import workplace from '@/components/project/workplace'

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
    },
    {
      path:'/project',
      component:project
    },
    {
      path:'/workplace',
      component:workplace
    }
  ]
})
