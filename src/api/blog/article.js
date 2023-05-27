import request from '@/utils/request'
export function insert(data) {
    return request({
        url: 'api/article',
        method: 'post'
        data
    })
}