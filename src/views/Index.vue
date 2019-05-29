<template>
  <div class="caculate" :class="{caculateTopFixed: isFixedState}">
    <TargetPriceInput :targetPrice="targetPrice" :class="{fixed: isFixedState}" />
    <Search @searchHandler="searchHandler" @searchNoActivate="searchNoActivate" @jumpAppGoData="jumpAppGoData" @jumpCreateCondition="jumpCreateCondition" />
    <Condition v-if="conditionShowState" :conditionsData="conditionsData" @sendConditionData="sendConditionData" @sendBodyScroll="sendBodyScroll" @sendBodyStopScroll="sendBodyStopScroll" />
  </div>
</template>

<script>
import { isApp, isAndroid, isIOS } from '../util/isApp'
import Utils from '../util/urlJumpMethods'
import '../assets/css/index.scss'
import TargetPriceInput from '../components/TargetPriceInput/TargetPriceInput'
export default {
  name: 'Index',
  components: {TargetPriceInput},
  data () {
    return {
      securityAbbrName: '',
      securityCode: '',
      securityMarket: '',
      conditionShowState: true,
      currentValue: '',
      conditionsData: { // 取到的目标
        cbAnalConvprice: '', // 转股价
        stockCurrentPrice: '',
        changesPercent: '',
        // changesUpDownPercent: '0.00%', // 假设涨跌幅
        cbAnalConvpremiumratio: '',
        currentPrice: '0.00'
      },
      modifyConditionsData: { // 当前变化的
        stockCurrentPrice: '', // 正股当前价
        changesPercent: '', // 涨跌幅
        // changesUpDownPercent: '0.00%', // 假设涨跌幅
        cbAnalConvpremiumratio: '' // 溢价率
      },
      targetPrice: 0,
      targetPriceDotNum: 3,
      isFixedState: false
    }
  },
  computed: {
  },
  methods: {
    searchHandler () {
      this.conditionShowState = false
    },
    jumpAppGoData (data) {
      this.securityAbbrName = data.name
      this.securityCode = data.code
      this.securityMarket = data.exchange
    },
    searchNoActivate (data) {
      this.conditionsData = data
      this.modifyConditionsData.cbAnalConvprice = data.cbAnalConvprice
      this.modifyConditionsData.stockCurrentPrice = data.stockCurrentPrice
      this.modifyConditionsData.changesPercent = data.changesPercent
      this.modifyConditionsData.stockChangesPercent = data.stockChangesPercent
      this.modifyConditionsData.cbAnalConvpremiumratio = data.cbAnalConvpremiumratio.toString().split('%')[0]
      this.conditionShowState = true
      this.targetPriceDotNum = (this.conditionsData.currentPrice.toString().split('.')[1] || '000').length
      this.caculate()
    },
    getUrlK (key, obj) {
      var oobj = obj || window.location.search
      var arr1 = []
      if (oobj) {
        if (/\?/.test(oobj)) {
          arr1 = oobj.toString().split('?')
        } else {
          arr1.push(oobj)
        }
        var arr2
        for (var i = 1; i < arr1.length; i++) {
          if (/&/.test(arr1[i])) {
            arr2 = arr1[i].split('&')
            for (var j = 0; j < arr2.length; j++) {
              if (arr2[j]) {
                var arr3 = arr2[j].split('=')
                if (arr3[0] === key) {
                  return decodeURI(arr3[1])
                }
              }
            }
          } else {
            arr2 = arr1[i].split('=')
            if (arr2[0] === key) {
              return decodeURI(arr2[1])
            }
          }
        }
      }
    },
    setUrlK (ojson) {
      var s = ''
      var name
      var key
      for (var p in ojson) {
        if (!ojson[p]) {
          return null
        }
        if (ojson.hasOwnProperty(p)) {
          name = p
        }
        key = ojson[p]
        s += '&' + name + '=' + encodeURIComponent(key)
      }
      return s.substring(1, s.length)
    },
    parseParams (data) {
      try {
        var tempArr = []
        for (var i in data) {
          var key = encodeURIComponent(i)
          var value = encodeURIComponent(data[i])
          tempArr.push(key + '=' + value)
        }
        var urlParamsStr = tempArr.join('&')
        return urlParamsStr
      } catch (err) {
        return ''
      }
    },
    jumpCreateCondition () {
      let url
      let temp1
      let temp2
      let obj1
      let obj2

      if (this.targetPrice <= this.conditionsData.currentPrice) {
        obj1 = {
          stockName: this.securityAbbrName,
          stockCode: this.securityCode,
          exchange: this.securityMarket,
          warnValue: this.targetPrice,
          createType: 0,
          strategyType: 1,
          securityType : 7,
          entrustStrategy: 4,
          upOrDown: 0,
          direction: 1
        }
        temp1 = encodeURIComponent(JSON.stringify(obj1))
        // url = 'qianqian://x-callback-url/conditionalCreate/create?direction=1&conditionalType=1'
        // url = 'qianqian://x-callback-url/conditionalCreate/create?stockName=' + this.securityAbbrName + '&exchange=' + this.securityMarket + '&direction=1&conditionalType=1'
        // temp = 'stockName:' + this.securityAbbrName + ',\'stockCode\':' + this.securityCode + ',\'exchange\':' + this.securityMarket + ',\'warnValue\':' + this.targetPrice + ',\'direction\':' + 1
        url = 'qianqian://x-callback-url/conditional/editting/?p=' + temp1
      } else {
        obj2 = {
          stockName: this.securityAbbrName,
          stockCode: this.securityCode,
          exchange: this.securityMarket,
          warnValue: this.targetPrice,
          createType: 0, // 0创建 1改单
          strategyType: 1, // 条件单类别 1价格
          securityType : 7, // 证券类别
          // entrustStrategy: '0', // 委托设置自定义
          entrustStrategy: 9, // 委托设置限价委托
          upOrDown: 1, // 触发条件 0小于等于 1大于等于
          direction: 2 // 1买 2卖
        }

        temp2 = encodeURIComponent(JSON.stringify(obj2))
        url = 'qianqian://x-callback-url/conditional/editting/?p=' + temp2
      }
      // console.log(url)
      if (isApp) { // app 端内
        if (isIOS()) {
          Utils.openUrl(url)
        } else if (isAndroid()) {
          Utils.openUrl(url)
        }
      } else { // h5
        // console.log(JSON.stringify(obj1))
        const href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hwabao.hbstockwarning'
        window.open(href, '_self')
      }
    },
    caculate () {
      let cbAnalConvpremiumratio = parseFloat(this.modifyConditionsData.cbAnalConvpremiumratio) / 100
      let dontNum
      if (this.securityMarket === 'SZ') { // 深圳
        dontNum = 3
      } else if (this.securityMarket === 'SH') { // 上海
        dontNum = 2
      }
      this.targetPrice = ((1 + cbAnalConvpremiumratio) * parseFloat(this.modifyConditionsData.stockCurrentPrice * 100) / this.conditionsData.cbAnalConvprice).toFixed(dontNum)
    },
    sendConditionData (data) {
      this.modifyConditionsData.stockCurrentPrice = data[0].money
      this.modifyConditionsData.changesPercent = data[1].money
      this.modifyConditionsData.cbAnalConvpremiumratio = data[2].money
      this.caculate()
    },
    sendBodyScroll () {
      this.isFixedState = true
    },
    sendBodyStopScroll () {
      this.isFixedState = false
    }
  },
  watch: {
    currentValue (val) {
      this.currentValue = val
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .mock-async-btn{
    display: inline-block;
    padding: 3px 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }
</style>
