import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store/index'
import router from '@/router/'

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

//  响应拦截器
request.interceptors.response.use(res => {
  // 对响应数据做些什么
  return res
}, async function (err) {
  // 对响应错误做些什么
  console.dir(err)

  // 如果响应码是401,说明token有问题,那判断一下是否有refrensh-token,如有拿去请求新的token,重新存到容器里,再把原请求发出去;没有回登录页
  if (err.response.status === 401) {
    if (!store.state.TokenObj.refresh_token) {
      router.push('/login')
      return
    }
    try {
      const res = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${store.state.TokenObj.refresh_token}`
        }
      })
      console.log(res)
      store.commit('changeTokenObj', {
        token: res.data.data.token,
        refresh_token: store.state.TokenObj.refresh_token
      })
      return request(err.config)
    } catch (error) {
      router.push('/login')
    }
  }
  return Promise.reject(err)
})
export default request
