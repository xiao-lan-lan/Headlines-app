import request from '@/utils/request'

// 获取文章评论
export function getComments (data) {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params: data
  })
}

// 添加评论
export function addComments (data) {
  return request({
    url: '/app/v1_0/comments',
    method: 'POST',
    data
  })
}
