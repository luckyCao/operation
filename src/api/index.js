import request from 'reqwest'

const cusTimeout = 20000

/**
 * 生成链接
 * @param param
 */
export function getUrl(data) {
  return request({
    url: '/page/generate',
    method: 'GET',
    type: 'json',
    timeout: cusTimeout,
    contentType: 'application/json;charset=utf-8',
    data: data
  })
}
/**
 * 获取页面列表
 * @param data
 */
export function getList(data) {
  return request({
    url: '/page/list',
    method: 'GET',
    type: 'json',
    timeout: cusTimeout,
    contentType: 'application/json;charset=utf-8',
    data: data
  })
}

/**
 * 更新页面设置
 * @param data
 */
export function savePage(data) {
  return request({
    url: '/page/save',
    method: 'POST',
    type: 'json',
    timeout: cusTimeout,
    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    data: data
  })
}

/**
 * 获取页面配置
 * @param data
 */
export function getPage(data) {
  return request({
    url: '/page/info',
    method: 'GET',
    type: 'json',
    timeout: cusTimeout,
    contentType: 'application/json;charset=utf-8',
    data: data
  })
}
