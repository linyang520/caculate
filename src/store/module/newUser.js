// initial state
const state = {
    newUserBannerData: [],
    userMockState: null
}

// getters
const getters = {}

// actions
const actions = {
}

// mutations
const mutations = {
    // 初始化 发现页 banner
    initBannerData (state, data) {
        state.newUserBannerData = data
    },
    // 新手体验用户是否模拟完成状态
    getUserMockState (state, data) {
        state.userMockState = data
    }
}

export const newUser = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
}
