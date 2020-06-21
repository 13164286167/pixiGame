import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})
router.beforeEach((to,from,next)=>{
  console.log( "路由守卫发现了跳转")
  // console.log(to,"to")
  // console.log(from,"from")
  // console.log(next,"next")
  next()
})
export default router;