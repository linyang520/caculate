<template>
  <div class="target-input">
    <div class="target-price">{{targetPrice || '--'}}</div>
    <div class="target-text">目标价格</div>
  </div>
</template>

<script>
import './TargetPriceInput.scss'
export default {
  props: {
    targetPrice: {type: Number, default: 0}
  },
  name: 'TargetPriceInput'
}
</script>
