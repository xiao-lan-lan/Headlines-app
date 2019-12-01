import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store/index'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 解决后端返回数据超过安全整数范围
request.defaults.transformResponse = [function (data) {
  try {
    return JSONbig.parse(data)
  } catch (err) {
    return {}
  }
}]

// 请求拦截器添加Token
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (store.state.TokenObj) {
    config.headers.Authorization = `Bearer ${store.state.TokenObj.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
