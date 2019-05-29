import Vue from 'vue'
import Index from '../views/Index'
import TargetPriceInput from '../components/TargetPriceInput/TargetPriceInput'
import Search from '../components/Search/Search'
import Condition from '../components/Condition/Condition'
import NumberInput from '../components/InputKeyPad/NumberInput'
import Key from '../components/InputKeyPad/Key'

let components = {
  // 要加载的组件
  Index,
  TargetPriceInput,
  Search,
  Condition,
  NumberInput,
  Key
}

let install = function () {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}

export default Object.assign(components, { install })
