<template>
  <div>
    <div class="search">
      <div class="search-input">
        <input type="text" @input="searchList" class="input-search" placeholder="请选择可转债品种" v-model="currentValue" ref="searchCode" autocomplete="off" autocapitalize="off" autocorrect="off" />
        <div class="border-dashed-bottom"></div>
      </div>
      <div class="bond-info" :class="{bondInfoActive: activeState}">
        <div class="bond-info-item">
          <span class="current-price" :class="labelClass"><span class="tit">当前价</span>{{bondInfo.currentPrice || '--'}}</span>
          <span class="rise-fall-value" :class="labelClass"><span class="tit">涨跌幅</span><span :class="{red: parseFloat(bondInfo.changesPercent) > 0, blue: parseFloat(bondInfo.changesPercent) < 0}">{{bondInfo.changesPercent || '--'}}</span></span>
        </div>
        <div class="bond-info-item">
          <span class="current-price" :class="labelClass"><span class="tit">转股价</span>{{bondInfo.cbAnalConvprice || '--'}}</span>
          <span class="rise-fall-value" :class="labelClass"><span class="tit">当前溢价率</span><span :class="{red: parseFloat(bondInfo.cbAnalConvpremiumratio) > 0, blue: parseFloat(bondInfo.cbAnalConvpremiumratio) < 0}">{{bondInfo.cbAnalConvpremiumratio || '--'}}</span></span>
        </div>
      </div>
      <div class="bond-detail clearfix" v-if="!activeState && showState">
        <div class="bond-detail-c">
          <div class="bond-item odd"><span class="bond-item-tit">正股代码</span><span class="bond-item-value">{{bondInfo.stockCode || '--'}}</span></div>
          <div class="bond-item even"><span class="bond-item-tit">正股名称</span><span class="bond-item-value">{{bondInfo.stockName || '--'}}</span></div>
        </div>
        <div class="bond-detail-c">
          <div class="bond-item odd"><p class="bond-item-tit">正股当前价</p><p class="bond-item-value">{{bondInfo.stockCurrentPrice || '--'}}</p></div>
          <div class="bond-item even"><span class="bond-item-tit">正股日涨跌幅</span><span class="bond-item-value" :class="{red: parseFloat(bondInfo.stockChangesPercent) > 0, blue: parseFloat(bondInfo.stockChangesPercent) < 0}">{{bondInfo.stockChangesPercent || '--'}}</span>
          </div>
        </div>
      </div>
      <div class="create-condition-btn" v-if="!activeState" @click="jumpCreateCondition"><span>马上创建价格条件单</span><i class="i-cj"></i></div>
    </div>
    <div class="search-list" v-if="activeState">
      <div class="search-item" v-for="(item, index) in searchData" :key="index" @click="chooseBond(item)">
        <div class="search-item-left">
          <span>{{item.securityAbbrName}}</span>
          <span class="code" v-html="item.securityCode">{{item.securityCode}}.{{item.securityMarket}}</span>
        </div>
        <div class="search-item-right">
          <span class="abbr">{{item.pinyinSecurityAbbr}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { appVersionBoolean } from '../../util/appVersion'
import caculateAPI from '../../api/api'
import './Search.scss'

export default {
  name: 'Search',
  data () {
    return {
      resultsList: {
        pageNo: '',
        pageSize: '',
        keyWord: ''
      },
      bondInfo: {
        securityCode: '',
        currentPrice: '--',
        cbAnalConvpremiumratio: '',
        stockCode: '--',
        stockName: '--',
        stockCurrentPrice: '--',
        stockChangesPercent: ''
      },
      targetPriceDotNum: 2,
      currentValue: '',
      CancelToken: null,
      cancel: null,
      searchData: null,
      activeState: false,
      showState: false
    }
  },
  computed: {
    labelClass () {
      if (this.bondInfo.currentPrice !== '--') {
        return 'active'
      }
    }
  },
  methods: {
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    searchList () {
      this.clearTimer()
      this.activeState = true
      this.showState = true
      this.$emit('searchHandler', this.currentValue)
      // if (this.currentValue && this.currentValue.length > 0) {
      //   // 获取当前延时函数的ID，便于后面clearTimeout清除该ID对应的延迟函数
      //   this.timer = setTimeout(() => {
      //     this.$emit('searchHandler', this.currentValue)
      //   }, 500)
      // } else {
      //   this.$emit('searchHandler', this.currentValue)
      // }
    },
    changeColor () {
      this.searchData.map((item, index) => {
        // console.log('item', item)
        if (this.currentValue && this.currentValue.length > 0) {
          // 匹配关键字正则
          let replaceReg = new RegExp(this.currentValue, 'g')
          // 高亮替换v-html值
          let replaceString = '<span class="search-text">' + this.currentValue + '</span>'
          this.searchData[index].securityCode = item.securityCode.replace(replaceReg, replaceString)
        }
      })
    },
    getSearchData () {
      caculateAPI.getSearchData({
        pageNo: this.resultsList.pageNo,
        pageSize: this.resultsList.pageSize,
        keyWord: this.currentValue
      })
        .then((res) => {
          // 请求数据完成后存储当前的开始和结束日期
          let pageSize = res.data.records.size
          let count = res.data.records.count
          let pageNo = res.data.records.count / pageSize
          if ((count % pageSize) > 0) {
            pageNo = (parseInt(pageNo) + 1)
          }
          window.sessionStorage.setItem('pageNo', pageNo)
          window.sessionStorage.setItem('pageSize', pageSize)

          res = res.data.records.list
          this.searchData = res
          // this.changeColor(this.searchData)
          // resultsList.map((item, index) => {
          //   // console.log('item', item)
          //   if (this.keyWords && this.keyWords.length > 0) {
          //     // 匹配关键字正则
          //     let replaceReg = new RegExp(this.keyWords, 'g')
          //     // 高亮替换v-html值
          //     let replaceString = '<span class="search-text">' + this.keyWords + '</span>'
          //     resultsList[index].name = item.name.replace(replaceReg, replaceString)
          //   }
          // })
        })
        .catch(function () {
          this.$toast({
            message: '系统忙',
            duration: 3000
          })
        })
    },
    chooseBond (item) {
      caculateAPI.chooseBondData({
        securityCode: item.securityCode
      })
        .then((res) => {
          res = res.data.records
          // this.bondInfo.cbAnalConvprice = res.cbAnalConvprice.toFixed(2)
          this.bondInfo.cbAnalConvprice = Math.round(res.cbAnalConvprice * 1000 / 10) / 100
          this.bondInfo.stockCode = res.stockCode
          this.bondInfo.stockName = res.stockName
          // this.bondInfo.stockCurrentPrice = res.stockCurrentPrice.toFixed(2)
          this.bondInfo.stockCurrentPrice = Math.round(res.stockCurrentPrice * 1000 / 10) / 100
          // 01 this.bondInfo.stockChangesPercent = res.stockChangesPercent.toFixed(2) + '%'
          // 02 let re = /([0-9]+\.[0-9]{2})[0-9]*/
          // this.bondInfo.stockChangesPercent = (res.stockChangesPercent).toString().replace(re, '$1') + '%'
          this.bondInfo.stockChangesPercent = Math.round(res.stockChangesPercent * 1000 / 10) / 100 + '%'
          this.bondInfo.currentPrice = Math.round(res.currentPrice * 1000 / 10) / 100
          // this.bondInfo.changesPercent = res.changesPercent.toFixed(this.targetPriceDotNum) + '%'
          this.bondInfo.changesPercent = Math.round(res.changesPercent * 1000 / 10) / 100 + '%'
          this.bondInfo.cbAnalConvpremiumratio = Math.round((res.cbAnalConvpremiumratio * 100) * 1000 / 10) / 100 + '%'
          // this.bondInfo.cbAnalConvpremiumratio = (res.cbAnalConvpremiumratio * 100).toFixed(2) + '%'
          this.activeState = false
          this.currentValue = res.name + '  ' + res.code
          this.$emit('jumpAppGoData', res)
          this.$emit('searchNoActivate', this.bondInfo)
          this.$refs.searchCode.blur()
          // this.$refs.searchCode.value = res.name + '  ' + res.code
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    jumpCreateCondition () {
      if (this.bondInfo.currentPrice !== '--') {
        this.$emit('jumpCreateCondition')
        // if (isApp) { // app 端内
        //   // const url = 'qianqian://x-callback-url/conditionalCreate/list'
        //   const url = 'qianqian://x-callback-url/conditionalCreate/create?direction=1&conditionalType=1'
        //   if (isIOS()) {
        //     Utils.openUrl(url)
        //   } else if (isAndroid()) {
        //     Utils.openUrl(url)
        //   }
        // } else {
        //   // h5
        //   const href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hwabao.hbstockwarning'
        //   window.open(href, '_self')
        // }
      } else {
        // this.$toast('缺少目标价信息不可跳转')
        this.$toast('请先选择可转债品种')
      }
    }
  },
  mounted () {
    // window.sessionStorage.getItem('pageNo')
    // window.sessionStorage.getItem('pageSize')
    // 获取数据
    // this.getSearchData()
  },
  watch: {
    currentValue (val) {
      this.currentValue = val
      this.resultsList.keyWord = this.currentValue
      // console.log(this.resultsList.keyWord)
      this.getSearchData()
    }
  }
}
</script>

<style scoped>
  .search-text {
    color: darkred;
  }
</style>
