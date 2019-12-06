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

// 点赞文章
export function addLike (articleId) {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}

// 取消点赞文章
export function deleteLike (articleId) {
  return request({
    url: `/app/v1_0/article/likings/${articleId}`,
    method: 'DELETE'
  })
}

// 不喜欢文章
export function addDislike (articleId) {
  return request({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}

// 取消不喜欢文章
export function deleteDislike (articleId) {
  return request({
    url: `/app/v1_0/article/dislikes/${articleId}`,
    method: 'DELETE'
  })
}
