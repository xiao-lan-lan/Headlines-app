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

// 对评论或评论回复点赞
export function addCommentLike (commentId) {
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commentId
    }
  })
}

// 取消对评论或评论回复点赞
export function addCommentDislike (commentId) {
  return request({
    url: `/app/v1_0/comment/likings/${commentId}`,
    method: 'DELETE'
  })
}
