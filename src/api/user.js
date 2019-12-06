import request from '@/utils/request'

// 登录
export function login (data) {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 获取用户频道列表
export function getChannels () {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}

// 获取用户相关数据
export function getUserData () {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}

// 获取用户信息
export function getUserSelf () {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}

// 修改用户资料
export function editUser (data) {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
