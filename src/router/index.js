import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级组件
import Login from '@/views/login/login'
import Layout from '@/views/layout'
import Search from '@/views/search/search'
import SearchResults from '@/views/search/SearchResults'
import Article from '@/views/article/article'
import UserEdit from '@/views/user/UserEdit'

// 二级路由组件
import Home from '@/views/home/home'
import QA from '@/views/QA'
import Video from '@/views/videos'
import User from '@/views/user/user'

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
    // 搜索结果
    path: '/search/:q',
    component: SearchResults
  },
  {
    // 文章详情
    path: '/article/:id',
    component: Article
  },
  {
    // 用户信息修改
    path: '/my',
    component: UserEdit
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
