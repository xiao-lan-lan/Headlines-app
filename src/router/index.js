import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级组件
const Login = () => import('@/views/login/login')
const Layout = () => import('@/views/layout')
const Search = () => import('@/views/search/search')
const SearchResults = () => import('@/views/search/SearchResults')
const Article = () => import('@/views/article/article')
const UserEdit = () => import('@/views/user/UserEdit')
const Robot = () => import('@/views/robot/robot')

// 二级路由组件
const Home = () => import('@/views/home/home')
const QA = () => import('@/views/QA')
const Video = () => import('@/views/videos')
const User = () => import('@/views/user/user')

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
    // 小智
    path: '/chat',
    component: Robot
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
