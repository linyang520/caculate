import Conditions from '../data/search.json'
import BondDetail from '../data/bondDetail.json'
const Mock = require('mockjs')

const searchListData = function () {
  let msgs = Conditions
  return {
    msgs: msgs
  }
}

const bondDetailListData = function () {
  let msgs = BondDetail
  return {
    msgs: msgs
  }
}

Mock.mock('/getSearchList', 'get', searchListData)
Mock.mock('/bondDetailListData', 'get', bondDetailListData)
