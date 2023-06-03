import request from '@/utils/request'

export function insertOrUpdate(data) {
  if (!data.id || data.id.trim().length === 0) {
    data.id = null
    return request({
      url: 'api/article',
      method: 'post',
      data
    })
  } else {
    data.date = null
    return request({
      url: 'api/article',
      method: 'put',
      data
    })
  }
}

export function selectAll(params) {
  return request({
    url: 'api/article',
    method: 'get',
    params
  })
}

export function updateArticleTopOrHide(data, isTop) {
  if (isTop) {
    return request({
      url: 'api/article/updateArticleTop',
      method: 'Put',
      data: JSON.stringify(data)
    })
  } else {
    return request({
      url: 'api/article/updateArticleHide',
      method: 'Put',
      data: JSON.stringify(data)
    })
  }
}

export function removeIdList(data) {
  return request({
    url: 'api/article',
    method: 'Delete',
    data
  })
}

export function update(data) {
  return request({
    url: 'api/article',
    method: 'Put',
    data
  })
}

export function selectOne(id) {
  return request({
    url: `api/article/${id}`,
    method: 'get'
  })
}

export default { selectOne, update, removeIdList, updateArticleTopOrHide, selectAll, insertOrUpdate }
