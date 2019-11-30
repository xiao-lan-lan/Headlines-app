import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由组件
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
