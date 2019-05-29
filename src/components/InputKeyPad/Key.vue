<template>
  <div class="key" @click="keyIn(value)">
    {{remove || hidden || removeAll ? '': value}}
    <img class="removeIcon" v-if="remove" :src="require('@/assets/img/removeIcon.png')"/>
    <img class="removeIcon" v-if="hidden" :src="require('@/assets/img/hideKeypad.png')"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    remove: {
      type: Boolean,
      default: false
    },
    removeAll: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    keyIn (key) {
      this.$emit('click', key)
    }
  }
}
</script>

<style scoped>
.key{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .5rem;
  color: #666666;
  flex: 1;
  height: 1.4rem;
  border-right: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  /* box-sizing: border-box; */
}
.key.noborder-r{
  border-right: none;
}
.key.noborder-b{
  /*border-bottom: none;*/
}
.key.flex2{
  flex: 2;
}
.key.confirm-btn{
  flex: 2;
  height: 2.8rem;
  color: #2f2f2f;
  font-size: 15px;
}
.key.clear-all-btn{
  color: #2f2f2f;
  font-size: 15px;
}
.removeIcon{
  display: block;
  width: 26px;
}
</style>
