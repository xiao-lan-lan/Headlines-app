import request from '@/utils/request'

// 获取频道文章列表
export function getArticles (data) {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: data
  })
}

// 获取文章详情
export function getArticleDetail (data) {
  return request({
    url: `/app/v1_0/articles/${data}`,
    method: 'GET'
  })
}
