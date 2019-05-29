<template>
  <div class="condition">
    <div class="title">计算条件设置</div>
    <div class="condition-item" v-for="(item, index) in conditionData" :key="index">
      <div class="condition-item-title">{{item.title}}</div>
      <div class="input-operate">
        <button class="minus" type="button" :disabled="disabled" @click="caculateInput(item.money, item.type, index, 2, 'minus')"></button>
        <NumberInput v-model="item.money" :class="{hasValueStyle: item.money}" :placeholder="item.placeholder" :showDecimal="true" :maxDecimal="item.dotNum" :maxlength="5" class="input-text"  @confirm="keyPadConfirm" @sendBodyScroll="sendBodyScroll" :type="item.type" :index="index"></NumberInput>
        <!--<button class="plus" type="button" :disabled="disabled" @click="caculateInput(item.money, item.type, index, item.dotNum, 'plus')"></button>-->
        <button class="plus" type="button" :disabled="disabled" @click="caculateInput(item.money, item.type, index, 2, 'plus')"></button>
      </div>
    </div>
  </div>
</template>

<script>
import './Condition.scss'
const BigNumber = require('bignumber.js')
export default {
  name: 'Condition',
  props: {
    conditionsData: {type: Object, default: null},
    disabled: Boolean
  },
  data () {
    return {
      targetPriceDotNum: 2,
      conditionData: [
        {
          title: '假设正股价格',
          money: this.conditionsData.stockCurrentPrice,
          placeholder: '价格(元)',
          type: 'number',
          // dotNum: (this.conditionsData.stockCurrentPrice.toString().split('.')[1] || '00').length
          dotNum: 2
        },
        {
          title: '假设相对涨跌幅',
          money: '0.00%',
          // money: this.conditionsData.changesUpDownPercent,
          placeholder: '百分比(%)',
          type: 'percent',
          // dotNum: (this.conditionsData.stockChangesPercent.split('%')[0].split('.')[1] || '00').length
          // dotNum: (parseFloat(this.conditionsData.changesUpDownPercent).toString().split('.')[1] || '00').length
          dotNum: 2
        },
        {
          title: '假设溢价率',
          money: this.conditionsData.cbAnalConvpremiumratio,
          placeholder: '百分比(%)',
          type: 'premiumratio',
          // dotNum: (this.conditionsData.cbAnalConvpremiumratio.toString().split('%')[0].split('.')[1] || '00').toString().substring(0, 2).length
          dotNum: 2
        }
      ],
      modifyConditionsData: {
        cbAnalConvprice: '', // 转股价
        stockCurrentPrice: '', // 正股当前价
        changesUpDownPercent: '0.00%', // 假设涨跌幅
        changesPercent: '', // 涨跌幅
        cbAnalConvpremiumratio: '' // 溢价率
      }
    }
  },
  methods: {
    formatnumber (value, num) {
      var a, b, c, i
      a = value.toString()
      b = a.indexOf('.')
      c = a.length
      if (num === 0) {
        if (b !== -1) {
          a = a.substring(0, b)
        }
      } else { // 如果没有小数点
        if (b === -1) {
          a = a + '.'
          for (i = 1; i <= num; i++) {
            a = a + '0'
          }
        } else { // 有小数点，超出位数自动截取，否则补0
          a = a.substring(0, b + num + 1)
          for (i = c; i <= b + num; i++) {
            a = a + '0'
          }
        }
      }
      return a
    },
    caculateInput (data, type, index, dotNum, caculateType) {
      // console.log(data, type, index, dotNum, caculateType)
      this.conditionData[index].money = data
      this.modifyConditionsData.cbAnalConvprice = this.conditionsData.cbAnalConvprice

      if (data === '') {
        return false
      }
      if (this.conditionsData.stockCurrentPrice === '') {
        this.disabled = true
        this.conditionData[index].money = ''
      } else {
        this.disabled = false
        // this.conditionData[1].money = '0.00%'
        data = new BigNumber(parseFloat(data))
        // data = parseFloat(data) * parseFloat(Math.pow(10, dotNum))
        if (caculateType === 'minus') {
          data = data.minus(0.01)
          // data = (data / Math.pow(10, dotNum)).toFixed(this.targetPriceDotNum)
        } else if (caculateType === 'plus') {
          data = data.plus(0.01)
          // data = (data / Math.pow(10, dotNum)).toFixed(this.targetPriceDotNum)
        }

        if (type === 'number') {
          this.conditionData[index].money = data.toFixed(2)
          this.modifyConditionsData.stockCurrentPrice = data
          // this.conditionData[1].money = ((this.modifyConditionsData.stockCurrentPrice - this.conditionsData.stockCurrentPrice) / this.conditionsData.stockCurrentPrice * 100).toFixed(this.targetPriceDotNum) + '%'
          this.caculatePercent()
        } else if (type === 'percent') { // 假设相对涨跌幅
          this.conditionData[index].money = data.toFixed(2) + '%'
          this.modifyConditionsData.changesPercent = data
          this.caculatePrice()
        } else if (type === 'premiumratio') { // 假设溢价率
          this.conditionData[index].money = data.toFixed(2) + '%'
          this.modifyConditionsData.cbAnalConvpremiumratio = data.toFixed(2)
        }

        this.$emit('sendConditionData', this.conditionData)
      }
    },
    keyPadConfirm (type, index, isClearValue) {
      // console.log(type, index, isClearValue)
      let data = this.conditionData[index].money
      this.modifyConditionsData.stockCurrentPrice = this.conditionData[0].money
      if (this.conditionsData.stockCurrentPrice === '') {
        this.disabled = true
        this.conditionData[index].money = ''
      } else {
        this.disabled = false
        data = new BigNumber(parseFloat(data))
        // this.conditionData[1].money = '0.00%'
        data.toFixed(2)
        if (type === 'number') {
          if (data > 10000) {
            this.conditionData[index].money = 10000.00
          } else {
            this.conditionData[index].money = data.toFixed(2)
          }
          this.caculatePercent()
        } else if (type === 'percent') {
          if (parseFloat(data) > 100) {
            this.conditionData[index].money = 100.00
          } else if (parseFloat(data) < -100) {
            this.conditionData[index].money = -100.00
          } else {
            this.conditionData[index].money = data.toFixed(2)
          }
          this.caculatePrice()
        } else if (type === 'premiumratio') {
          if (parseFloat(data) > 500) {
            this.conditionData[index].money = 500.00
          } else if (parseFloat(data) < -100) {
            this.conditionData[index].money = -100.00
          } else {
            this.conditionData[index].money = data.toFixed(2)
          }
        }
        this.$emit('sendConditionData', this.conditionData)

        // console.log(parseFloat(data), this.conditionData[index].money)
        if ((type === 'percent' || type === 'premiumratio') && this.conditionData[index].money.toString().indexOf('%') === -1 && this.conditionData[index].money.toString() !== '') {
          this.conditionData[index].money += '%'
        }
        if (isClearValue === 'clearValue') {
          this.conditionData[index].money = ''
        }
        this.$emit('sendBodyStopScroll')
      }
    },
    caculatePercent () {
      // console.log(this.modifyConditionsData.stockCurrentPrice)
      // let money1 = this.formatnumber(((this.modifyConditionsData.stockCurrentPrice - this.conditionsData.stockCurrentPrice) / this.conditionsData.stockCurrentPrice * 100), 2)
      let dataPrice = Math.round((this.modifyConditionsData.stockCurrentPrice - this.conditionsData.stockCurrentPrice) * 1000 / 10) / 100
      let money1 = Math.round(dataPrice / this.conditionsData.stockCurrentPrice * 100 * 1000 / 10) / 100
      this.conditionData[1].money = this.formatnumber(money1, 2) + '%'
      // console.log(this.formatnumber(dataPrice, 2), this.formatnumber((this.modifyConditionsData.stockCurrentPrice - this.conditionsData.stockCurrentPrice), 2), this.conditionsData.stockCurrentPrice)
    },
    caculatePrice () {
      let money0 = (this.conditionsData.stockCurrentPrice * (1 + parseFloat(this.conditionData[1].money) / 100)).toFixed(2)
      this.conditionData[0].money = this.formatnumber(money0, 2)
    },
    sendBodyScroll () {
      this.$emit('sendBodyScroll')
    }
  },
  mounted () {
    // console.log(this.conditionsData.cbAnalConvpremiumratio)
  }
}
</script>

<style scoped>

</style>
