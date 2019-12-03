import request from '@/utils/request'

// 获取全部频道
export function getAllChannels () {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}
