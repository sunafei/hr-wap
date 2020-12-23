import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/interview',
    method: 'get',
    params
  })
}
export function saveOrUpdate(params) {
  return request({
    url: '/api/interview/save',
    method: 'post',
    params
  })
}
export function del(id) {
  const url = '/api/interview/' + id + '/del'
  return request({
    url: url,
    method: 'get'
  })
}
export function get(id) {
  const url = '/api/interview/' + id + '/get'
  return request({
    url: url,
    method: 'get'
  })
}
export function evaluate(params) {
  const url = '/api/interview/' + params.id + '/evaluate'
  return request({
    url: url,
    method: 'post',
    params
  })
}
