// initial state
const state = {
  indexTabNum: null,
  settingMenu: [
    {
      configName: null,
      chooseType: null,
      detailList: null
    }
  ],
  wechatTriggerState: null,
  wechatTriggerOpen: null,
  isHighVersion: false,
  isShowUpdateDialog: false,
  isShowUpdateDialogTrans: false
}

// getters
const getters = {}

// actions
const actions = {
}

// mutations
const mutations = {
  // 设置发现页
  initSettingMenu (state, settingMenu) {
    state.settingMenu = settingMenu
    for (var i = 0; i < settingMenu[0].detailList.length; i++) {
      if (settingMenu[0].detailList[i].checked === 1) {
        state.indexTabNum = i
      }
    }
  },
  // 初始化微信通知状态
  initWechatTriggerState (state, wechatTriggerState) {
    state.wechatTriggerState = wechatTriggerState
  },
  // 初始化微信开关状态
  initWechatTriggerOpen (state, wechatTriggerOpen) {
    state.wechatTriggerOpen = wechatTriggerOpen
  },
  // 修改微信开关状态
  changeWechatTriggerPen (state, wechatTriggerOpen) {
    state.wechatTriggerOpen = wechatTriggerOpen
  }
}

export const settingPage = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
}
