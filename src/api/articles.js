import request from '@/utils/request'

export function getArticles (data) {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: data
  })
}
