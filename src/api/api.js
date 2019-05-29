import axios from 'axios'
import qs from 'qs'
import baseUrl from '../../config/baseUrlBase'

axios.defaults.timeout = 5000
axios.defaults.baseURL = baseUrl

let caculateAPI = {
  getSearchData (params) {
    return axios.get(baseUrl + '/activity/convertibleBondSearch.json?', {params})
    // return axios.post(baseUrl + '/activity/convertibleBondSearch.json?pageNo=0&pageSize=10&keyWord=hdzz', qs.stringify({
    //   pageNo: pageNo,
    //   pageSize: pageSize,
    //   keyWord: keyWord
    // }), {
    //   headers: {
    //     'token': 'http-test',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }, callback)
  },
  chooseBondData (params) {
    return axios.get(baseUrl + '/activity/queryConvertibleBondDetail.json', {
      // securityCode: securityCode
      params
    })
    // return axios.post(baseUrl + '/activity/queryConvertibleBondDetail.json?securityCode=110042', qs.stringify({
    //   securityCode: securityCode
    // }), {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // })
  },
  getSearchData01 (pageNo, pageSize, keyWord) {
    return axios.get(baseUrl + '/activity/convertibleBondSearch.json?pageNo=' + pageNo + '&pageSize=' + pageSize + '&keyWord=' + keyWord, {
      pageNo: pageNo,
      pageSize: pageSize,
      keyWord: keyWord
    })
    // return axios.post(baseUrl + '/activity/convertibleBondSearch.json?pageNo=0&pageSize=10&keyWord=hdzz', qs.stringify({
    //   pageNo: pageNo,
    //   pageSize: pageSize,
    //   keyWord: keyWord
    // }), {
    //   headers: {
    //     'token': 'http-test',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }, callback)
  }
}

export default caculateAPI
