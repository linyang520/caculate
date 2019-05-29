import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import baseUrl from '../../config/baseUrlBase'

axios.defaults.withCredentials = true
axios.defaults.timeout = 5000
axios.defaults.baseURL = baseUrl
// axios.defaults.baseURL = process.env.BASE_API
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称')注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Accept',
      'Access-Control-Allow-Methods': 'Get,Post,Put,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // 如果是post则用qs序列化数据
    if (config.method === 'post') {
      config.data = qs.stringify({
        data: config.data
      })
    }
    // if (token) {
    //   config.params = {'token': token}
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  })

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // router.app.$indicator.close() // 关闭loading
    if (response.data.errCode === -5) {
      const redirectUrl = JSON.stringify(router.currentRoute.fullPath.slice(1))
      window.sessionStorage.setItem('redirect', redirectUrl) // 从哪个页面跳转
      router.push({
        path: '/'
      })
      return ''
    } else {
      return response.data
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
      }
    }
    return Promise.reject(error)
  })

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export default axios
