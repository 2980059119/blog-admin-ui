import request from '@/utils/request'

export function insert(data) {
  return request({
    url: 'api/notebook',
    method: 'post',
    data
  })
}

export function selectAll(data) {
  return request({
    url: 'api/notebook',
    method: 'get',
    data
  })
}
export function remove(data) {
  return request({
    url: 'api/notebook',
    method: 'delete',
    data
  })
}
export default { remove, insert, selectAll }
