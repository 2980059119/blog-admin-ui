import request from '@/utils/request'

export function insert(data) {
  return request({
    url: 'api/categories',
    method: 'post',
    data
  })
}

export function selectAll(data) {
  return request({
    url: 'api/categories',
    method: 'get',
    data
  })
}
export function updateCategories(data) {
  console.log(data)
  return request({
    url: 'api/categories/updateCategories',
    method: 'put',
    data: JSON.stringify(data)
  })
}

export default { updateCategories, insert, selectAll }
