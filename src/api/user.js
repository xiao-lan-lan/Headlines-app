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

// 关注用户
export function followUser (userId) {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })
}

// 取消关注用户
export function unfollowUser (userId) {
  return request({
    url: `/app/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}

// 修改用户头像
export function editUserImg (data) {
  return request({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
