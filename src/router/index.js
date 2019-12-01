import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级组件
import Login from '@/views/login/login'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '',
    component: Layout
  }
]

const router = new VueRouter({
  routes
})

export default router
