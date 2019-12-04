import request from '@/utils/request'

// 联想词补全
export function getSuggestion (q) {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}

// 获取搜索结果
export function getSearchResults (data) {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params: data
  })
}
