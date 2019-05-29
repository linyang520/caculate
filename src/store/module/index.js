import { mutations } from '../mutations'
import { actions } from '../actions'
import { getters } from '../getters'

export const index = {
  state: {
    indexTabState: null,
    userLoginState: null,
    isHasAccount: null,
    isShowDialog: null,
    isConditionUser: null,
    newUserDialogData: {
      mainTitle: null,
      imgUrl: null,
      jumpUrl: null
    },
    weiTuoData: {
      monitorNum: null,
      total: null,
      unreadNum: null
    },
    monitorNumData: {
      monitorNum: null
    },
    unreadNumData: {
      total: null,
      unreadNum: null
    },
    scData: {
      menuId: null,
      subscribeNum: null
    },
    unData: {
      menuId: null,
      unreadNum: null
    },
    communicateCurrentType: 0,
    CommunicateData: [
      {
        findExperiences: [],
        detailList: []
      }
    ],
    reloadAction: 0,
    TopMenuData: [],
    bannerData: [],
    initIndexBannerData: [],
    trialBannerData: [],
    CaseData: {
      url: null,
      caseDetailVos: []
    },
    videoListData: {
      children: []
    },
    newUserDialogBanner: [],
    courseData: [],
    isShowSetting: null,
    isShowSettingTip: false,
    userMockState: null,
    confirmDialogState: 0,
    tipText: null,
    slideDirection: '',
    awardData: [],
    newUserBannerData: [],
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
  },
  getters: getters,
  mutations: mutations,
  actions: actions
}
