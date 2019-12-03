import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级组件
import Login from '@/views/login/login'
import Layout from '@/views/layout'
import Search from '@/views/search/search'

// 二级路由组件
import Home from '@/views/home/home'
import QA from '@/views/QA'
import Video from '@/views/videos'
import User from '@/views/user'

Vue.use(VueRouter)

const routes = [
  // 一级路由：登录、底部导航栏
  {
    path: '/login',
    component: Login
  },
  {
    // 搜索
    path: '/search',
    component: Search
  },
  {
    path: '',
    component: Layout,
    // 二级路由
    children: [
      {
        // 主页
        path: '',
        component: Home
      },
      {
        // 问答
        path: '/qa',
        component: QA
      },
      {
        // 视频
        path: '/video',
        component: Video
      },
      {
        // 我的
        path: '/user',
        component: User
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
