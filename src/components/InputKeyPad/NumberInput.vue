<template>
  <div class="keypad-wrap" ref="keypadBox">
    <div class="keypad-input">
      <span :class="`subVal subVal-first ${insertIndex === -1 && !icon || insertIndex === -1 && icon && numbers.length === 0? 'active' : ''} ${align === 'right'? 'first-align-right' : ''} ${align === 'center'? 'align-center' : ''}`" @click="insert(-1)">
        {{insertIndex === -1 && numbers.length === 0 && align === 'right' || insertIndex == null && numbers.length === 0 && align === 'right'? placeholder : ''}}
      </span>
      <span :class="`subVal ${insertIndex === -1? 'active' : ''}`" v-if="icon && numbers.length > 0">{{icon}}</span>
      <span :class="`subVal ${insertIndex === index? 'active': ''}`" v-for="(item, index) in numbers" :key="index" @click="insert(index)">{{password? '*' : item}}</span>
      <span :class="`subVal subVal-last ${align === 'right'? 'last-align-right' : ''}`" @click="focus">
        {{insertIndex === -1 && numbers.length === 0 && align === 'left' || insertIndex === null && numbers.length === 0 && align === 'left'? placeholder : ''}}
      </span>
        <div class="claerBtn" v-if="showClaerBtn">
          <transition name="fade">
            <img  v-show="numbers.length > 0 && showKeypadBar" @click="clearValue" :src="require('@/assets/img/pf_pic13.png')"/>
          </transition>
        </div>
      <div class="center-placeholder" v-if="insertIndex === -1 && numbers.length === 0 && align === 'center' || insertIndex === null && numbers.length === 0 && align === 'center'" @click="insert(-1)">{{placeholder}}</div>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div class="keypad-bar" ref="keypad" v-if="showKeypadBar">
        <div class="keypad-main">
          <div class="keypad-list">
            <key value="1" @click="keyIn"></key>
            <key value="2" @click="keyIn"></key>
            <key value="3" @click="keyIn"></key>
          </div>
          <div class="keypad-list">
            <key value="4" @click="keyIn"></key>
            <key value="5" @click="keyIn"></key>
            <key value="6" @click="keyIn"></key>
          </div>
          <div class="keypad-list">
            <key value="7" @click="keyIn"></key>
            <key value="8" @click="keyIn"></key>
            <key value="9" @click="keyIn"></key>
          </div>
          <div class="keypad-list">
            <key class="noborder-b" v-show="showDecimal" value="." @click="keyIn"></key>
            <key class="noborder-b" value="0" @click="keyIn" :style="showDecimal? '' : 'flex:2; padding-right: 1px;'"></key>
            <key class="noborder-b" value="-" @click="keyIn"></key>
            <!--<key class="noborder-b" value="hidden" :hidden="true" @click="keyIn"></key>-->
          </div>
        </div>
        <div class="keypad-handle">
          <key class="noborder-r noborder-b" value="remove" :remove="true" @click="keyIn"></key>
          <key class="noborder-r noborder-b clear-all-btn" :value="clearAllButtonText" @click="keyIn"></key>
          <key class="noborder-r noborder-b confirm-btn" :value="confirmButtonText" @click="keyIn" style=""></key>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Key from './Key'
export default {
  components: {
    Key
  },
  props: {
    value: { type: String | Number, default: null },
    align: { type: String, default: 'left' },
    placeholder: { type: String, default: '' },
    confirmButtonText: { type: String, default: '完成' },
    clearAllButtonText: { type: String, default: '清空' },
    icon: { type: String, default: null },
    showDecimal: { type: Boolean, default: true },
    maxlength: { type: Number, default: 10 },
    maxDecimal: { type: Number, default: 10 },
    password: { type: String | Boolean, default: false },
    showClaerBtn: { type: Boolean, default: false },
    type: { type: String, default: null },
    index: { type: Number, default: 0 }
  },
  data () {
    return {
      numbers: [],
      insertIndex: null,
      showKeypadBar: false
    }
  },
  watch: {
    // 监控showKeypadBar来重置body的paddingBottom 解决模拟按钮在手机底部唤起模拟键盘遮住输入框bug
    showKeypadBar () {
      if (this.showKeypadBar === false) {
        document.body.style.paddingBottom = '0'
      }
    },
    value () {
      // 双向绑定数据
      if (this.value) {
        this.numbers = this.value.toString().split('')
      } else {
        this.numbers = []
      }
    }
  },
  created () {
    // 初始化双向绑定数据
    if (this.value) {
      this.numbers = this.value.toString().split('')
    }
    // 点击其他不在的区域触发事件
    document.addEventListener('touchstart', this.cancel)
  },
  destroyed () {
    document.removeEventListener('touchstart', this.cancel)
  },
  methods: {
    // 监控是否在空白区域
    cancel (e) {
      if (!this.$refs.keypadBox.contains(e.target)) {
        if (this.showKeypadBar === true) {
          this.$emit('confirm', this.type, this.index)
        }
        this.insertIndex = null
        this.showKeypadBar = false
      }
    },
    // 键盘输入
    keyIn (value) {
      if (value === '.') { // 小数点
        if (this.numbers.indexOf('.') === -1) {
          this.numbers.splice(this.insertIndex + 1, 0, value)
          this.insertIndex++
          setTimeout(() => {
            this.$emit('input', this.numbers.join(''))
          }, 0)
        }
      } else if (value === 'remove') { // 删除
        if (this.insertIndex >= 0) {
          if (this.insertIndex === this.numbers.length) {
            this.numbers.splice(this.insertIndex, 1)
            this.insertIndex = this.numbers.length - 1
          } else {
            this.numbers.splice(this.insertIndex, 1)
            this.insertIndex--
          }
          setTimeout(() => {
            this.$emit('input', this.numbers.join(''))
          }, 0)
        }
      } else if (value === 'hidden') { // 隐藏键盘
        this.insertIndex = null
        this.showKeypadBar = false
        this.$emit('confirm', this.type, this.index)
      } else if (value === this.confirmButtonText) { // 确定
        this.insertIndex = null
        this.showKeypadBar = false
        this.$emit('confirm', this.type, this.index)
      } else if (value === this.clearAllButtonText) {
        this.insertIndex = null
        this.showKeypadBar = false
        this.numbers = []
        this.$emit('confirm', this.type, this.index, 'clearValue')
      } else { // 正常输入
        // 先添加 在判断是否小于最大值 如果大于最大值则减去最新输入--  最后在$emit出去
        this.numbers.splice(this.insertIndex + 1, 0, value)
        this.insertIndex++
        let integer = this.numbers.join('').split('.')[0]
        if (integer.length > this.maxlength) { // 最大值判断 默认最大99亿
          this.numbers.splice(this.insertIndex, 1)
          this.insertIndex--
          // this.$toast('不能超过单笔最大限额')
        }
        if (this.numbers.indexOf('.') !== -1) {
          let remainder = this.numbers.join('').split('.')[1]
          if (remainder.length > this.maxDecimal) {
            this.numbers.splice(this.insertIndex, 1)
            this.insertIndex--
          }
        }
        setTimeout(() => {
          this.$emit('input', this.numbers.join(''))
        }, 0)
      }
    },
    // 唤起键盘获取光标坐标
    insert (index) {
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      setTimeout(() => {
        let offsetY = this.$refs.keypadBox.offsetTop
        let boxHeight = this.$refs.keypadBox.offsetHeight
        let keypadHeight = this.$refs.keypad.offsetHeight
        let winHeight = document.documentElement.clientHeight
        let boxTopHeight = this.$refs.keypadBox.getBoundingClientRect().top
        if (scrollHeight - offsetY < keypadHeight) { // input在内容最底部的情况
          // document.body.style.paddingBottom = keypadHeight + 'px'
          var scrollValue = keypadHeight - (winHeight - offsetY - boxHeight - 10)
          document.body.style.paddingBottom = scrollValue + 'px'
          this.$emit('sendBodyScroll')
          // scrollIntoView 浏览器api
          this.$refs.keypadBox.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
          // this.$refs.keypadBox.scrollIntoViewIfNeeded(true);
        } else if (winHeight - boxTopHeight - boxHeight < keypadHeight) { // input在屏幕底部（不是内容底部）的情况
          window.scrollTo(0, offsetY - (boxTopHeight / 2))
        }
      }, 30)
      this.insertIndex = index
      this.showKeypadBar = true
    },
    // 获取焦点
    focus () {
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      setTimeout(() => {
        let offsetY = this.$refs.keypadBox.offsetTop
        let boxHeight = this.$refs.keypadBox.offsetHeight
        let keypadHeight = this.$refs.keypad.offsetHeight
        let winHeight = document.documentElement.clientHeight
        let boxTopHeight = this.$refs.keypadBox.getBoundingClientRect().top
        if (scrollHeight - offsetY < keypadHeight) { // input在内容最底部的情况
          // document.body.style.paddingBottom = keypadHeight + 'px'
          var scrollValue = keypadHeight - (winHeight - offsetY - boxHeight - 10)
          document.body.style.paddingBottom = scrollValue + 'px'
          this.$emit('sendBodyScroll')
          // scrollIntoView 浏览器api
          this.$refs.keypadBox.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
          // this.$refs.keypadBox.scrollIntoViewIfNeeded(true);
        } else if (winHeight - boxTopHeight - boxHeight < keypadHeight) { // input在屏幕底部（不是内容底部）的情况
          window.scrollTo(0, offsetY - (boxTopHeight / 2))
        }
      }, 30)
      this.insertIndex = this.numbers.length - 1
      this.showKeypadBar = true
    },
    // 清除值
    clearValue () {
      this.numbers = []
      this.insertIndex = -1
      setTimeout(() => {
        this.$emit('input', this.numbers.join(''))
      }, 0)
    }
  }
}
</script>

<style scoped>
.keypad-wrap{}
.keypad-input{
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: .8rem;
  /* border: 1px solid #dddddd; */
  padding: .2rem 0;
  overflow-x: auto;
  position: relative;
}
.center-placeholder{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: .48rem;
  font-size: .26rem;
  color: #999999;
}
.subVal{
  display: flex;
  align-items: center;
  line-height: .48rem;
  font-size: .32rem;
  color: #2F2F2F;
  padding: 0 .02rem;
  height: 100%;
}
.subVal.active{
  position: relative;
}
.subVal.active:after{
  position: absolute;
  right: -1px;
  top: 0;
  height: 100%;
  display: block;
  content: '';
  border-right: 1px solid #333333;
  animation: blink 1s linear alternate infinite;
}
.subVal-first{
  width: .1rem;
}
.first-align-right{
  flex: 1;
  justify-content: flex-end;
  color: #999999;
  font-size: .26rem;
}
.subVal-last{
  width: .2rem;
  flex:1;
  color: #999999;
  font-size: .26rem;
}
.last-align-right{
  flex: none;
}
.align-center{
  flex: 1;
}
@keyframes blink {
  0% {opacity: 1;}
  50% {opacity: 0;}
  100% {opacity: 1;}
}
.claerBtn{
  width: .4rem;
  height: .4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.claerBtn img{
  display: block;
  width: 100%;
}

.keypad-bar{
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  border-top: 1px solid #dddddd;
}
.keypad-main{
  width: 75%;
}
.keypad-list{
  display: flex;
}
.keypad-handle{
  display: flex;
  flex-direction: column;
  width: 25%;
  background-color: #E9E9E9;
}

/* 键盘动画  */
.slide-fade-enter-active {
  transition: all .3s linear;
}
.slide-fade-leave-active {
  transition: all .3s linear;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/** clearBtn **/
.fade-enter-active {
  transition: all .3s linear;
}
.fade-leave-active {
  /* transition: all .3s linear; */
}
.fade-enter {
  opacity: 0;
  transform: scale(.3);
}
.fade-leave-to{
  opacity: 1;
  transform: scale(1);
}
</style>
