import request from '@/utils/request'

export function insert(data) {
  return request({
    url: 'api/tag',
    method: 'post',
    data
  })
}
export function selectAll(params) {
  return request({
    url: 'api/tag',
    method: 'get',
    params
  })
}
export function remove(data) {
  return request({
    url: 'api/tag',
    method: 'delete',
    data
  })
}
export default { remove, selectAll, insert }
