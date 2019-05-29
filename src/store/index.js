import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import { index } from './module/index'
import { newUser } from './module/newUser'
import { settingPage } from './module/settingPage'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    index,
    newUser,
    settingPage
  },
  strict: debug
})

// store.watch(() => {
//   console.log(666)
// })

export default store
