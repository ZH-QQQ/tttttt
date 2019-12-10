import Vue from  'vue'
import Router from  'vue-router'
Vue.use(Router)

import Recommend from '../pages/recommend'
import Singer from  '../pages/singer/singer.vue'
import Rank from  '../pages/rank'
import Search from  '../pages/search'
import Detail from  'pages/detail'
let router=new Router({
  mode:'hash',
  routes:[
    {
      path:'/recommend',
      component:Recommend
    },
    {
      path:'/singer',
      component:Singer,
      children:[
        {
          path:':mid',
          component:Detail
        }
      ]
    },
    {
      path:'/rank',
      component:Rank
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:'/',
      redirect:'/recommend'
    }
  ]
})
export default router