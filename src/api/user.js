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
