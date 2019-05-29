import apiList from '../api'
import { isApp, isIOS, isAndroid } from '../util/isApp'

// 改变发现页顶部tab状态
const changeIndexTabState = 'changeIndexTabState'
// 改变用户登录状态
const changeUserLoginState = 'changeUserLoginState'
// 改变用户开户状态
const changeUserAccountState = 'changeUserAccountState'
// 获取用户是否为条件单用户
const changeUserPosition = 'changeUserPosition'
// 异步模拟 改变用户登录状态
const asyncChangeUserLoginState = 'asyncChangeUserLoginState'
// 关闭首页新手弹出框
const closeDialog = 'closeDialog'
// 获取社区的经验交流信息列表
const getTypeCommunicate = 'getTypeCommunicate'
// 更改初始化数据
const changeCommunicateData = 'changeCommunicateData'
// 初始化top menu数据
const changeTopMenuData = 'changeTopMenuData'
// 初始化首页banner
const initIndexBannerData = 'initIndexBannerData'
// 初始化 马上试用 banner
const initTrialBannerData = 'initTrialBannerData'
// 初始化 casedata
const initCaseData = 'initCaseData'
// 初始化图解教程
const getCourseData = 'getCourseData'
// 展示发现页设置
const showSettingBtn = 'showSettingBtn'
// 隐藏发现页设置
const hideSettingBtn = 'hideSettingBtn'

// 更新发现页
const settingFindPageTab = 'settingFindPageTab'
// 获取新手弹框
const getNewUserDialog = 'getNewUserDialog'
// 新手banner list
const getNewUserDialogBanner = 'getNewUserDialogBanner'

// 近期委托数据
const initWeiTuoData = 'initWeiTuoData'
const initMonitorNumData = 'initMonitorNumData'
const initUnreadNumData = 'initUnreadNumData'
// 近期委托，数据消失
const changeWTData = 'changeWTData'
// 经验交流当前显示下标加1
const incrementCommunicateCurrentType = 'incrementCommunicateCurrentType'
// 经验交流当前显示下标减1
const decrementCommunicateCurrentType = 'decrementCommunicateCurrentType'
// 页面加载触发了
const reload = 'reload'
// 视频列表数据
const initVideoListData = 'initVideoListData'
// 展示confirm弹出框
const showConfirmDialog = 'showConfirmDialog'
// 更改toast提示及文案;
const changeToast = 'changeToast'
// 判断是否弹出首页弹出框
const initShowIndexDialog = 'initShowIndexDialog'
// 改变动画滑动方向
const changeSlideDirection = 'changeSlideDirection'
// 得到中签消息
const getAwardData = 'getAwardData'
// 更新中签消息（关闭时调用）
const closeAwardTip = 'closeAwardTip'
// 关闭更新提示
const closeUpdateDialog = 'closeUpdateDialog'
// 初始化 发现页 banner
const initBannerData = 'initBannerData'
// 新手体验用户是否模拟完成状态
const getUserMockState = 'getUserMockState'
// 设置发现页
const initSettingMenu = 'initSettingMenu'
// 初始化微信通知状态
const initWechatTriggerState = 'initWechatTriggerState'
// 初始化微信开关状态
const initWechatTriggerOpen = 'initWechatTriggerOpen'
// 修改微信开关状态
const changeWechatTriggerPen = 'changeWechatTriggerPen'
// 模拟条件单委托未读数量

const unData = 'unData'
const scData = 'scData'

export const mutations = {
  [unData] (state, obj) {
    state.unData = obj.unData
  },
  [scData] (state, obj) {
    state.scData = obj.scData
  },
  // 模拟 asyncChangeUserLoginState
  [asyncChangeUserLoginState] (state) {
    state.userLoginState = !state.userLoginState
  },
  // 从后台获取顶部tab状态，修改indexTabState
  [changeIndexTabState] (state, obj) {
    state.indexTabState = obj.indexTabState
  },
  // 从后台获取登录状态接口
  [changeUserLoginState] (state, obj) {
    state.userLoginState = obj.userLoginState
  },
  // 从后台获取永魂开户状态
  [changeUserAccountState] (state, obj) {
    state.isHasAccount = obj.isHasAccount
  },
  // 判断用户是否为条件单用户
  [changeUserPosition] (state, obj) {
    state.isConditionUser = obj.isConditionUser
  },
  // 初始化委托data
  [initWeiTuoData] (state, obj) {
    state.weiTuoData = obj.weiTuoData
  },
  [initMonitorNumData] (state, obj) {
    state.monitorNumData = obj.monitorNumData
  },
  [initUnreadNumData] (state, obj) {
    state.unreadNumData = obj.unreadNumData
  },
  // 近期委托，数据消失
  [changeWTData] (state, obj) {
    // state.weiTuoData.unreadNum = obj.unreadNum
    state.unreadNumData.unreadNum = obj.unreadNum
  },
  // 获取新手弹框
  [getNewUserDialog] (state, obj) {
    state.newUserDialogData = obj.newUserDialog
  },
  // 新手弹框 banner list
  [getNewUserDialogBanner] (state, obj) {
    state.newUserDialogBanner = obj.newUserDialogBanner
  },
  // 关闭首页新手弹框
  [closeDialog] (state) {
    state.isShowDialog = false
    document.body.style.height = 'auto'
    document.body.style.overflow = 'auto'
  },
  // 从社区获取列表信息
  [getTypeCommunicate] (state, index) {
    state.communicateCurrentType = index
  },
  // 从后台获取数据更改经验交流数据
  [changeCommunicateData] (state, obj) {
    state.CommunicateData = obj.CommunicateData
  },
  // 初始化top menu数据
  [changeTopMenuData] (state, obj) {
    state.TopMenuData = obj.TopMenuData
  },

  // 初始化 首页顶部banner
  [initIndexBannerData] (state, obj) {
    state.indexBannerData = obj.indexBannerData
  },
  // 初始化 马上试用 banner
  [initTrialBannerData] (state, obj) {
    state.trialBannerData = obj.trialBannerData
  },
  // 初始化 CaseData
  [initCaseData] (state, obj) {
    state.CaseData = obj.CaseData
  },
  // 初始化图解教程
  [getCourseData] (state, obj) {
    state.courseData = obj.courseData
  },
  // 视频教程 list
  [initVideoListData] (state, obj) {
    state.videoListData = obj.videoListData
  },
  // 弹出隐藏发现页设置
  [showSettingBtn] (state) {
    state.isShowSetting = true
    // 获取特别提示的次数
    let uuid = ''
    if (isApp) {
      uuid = window.bridge.deviceUUID()
    }
    apiList.getUpdateTip({deviceId: uuid, menuId: 194})
      .then((res) => {
        var isShowUpdateDialog = res.data.alertStatus
        let userAgent = window.navigator.userAgent
        const id = res.data.id
        apiList.updateNewUserStatus({menuId: id, deviceId: uuid})
          .then((res) => {
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
        if (isIOS()) {
          let IOSVERSION = userAgent.split('-')[userAgent.split('-').length - 1]
          let IOSVersionArr = IOSVERSION.split('.')
          if (parseInt(IOSVersionArr[0]) > 4 || (parseInt(IOSVersionArr[0]) === 4 && parseInt(IOSVersionArr[1]) >= 4)) {
            state.isHighVersion = true
            state.isShowUpdateDialog = false
          } else {
            if (isShowUpdateDialog === 0) {
              // this.$store.commit({
              //   type: 'showUpdateDialog',
              //   isShowUpdateDialog: true
              // })
              state.isShowUpdateDialog = true
            }
          }
        } else if (isAndroid()) {
          let ANDROIDVERSION = userAgent.split('-Android-')[1].split('-')[0]
          let AndVersionArr = ANDROIDVERSION.split('.')
          if (parseInt(AndVersionArr[0]) > 4 || (parseInt(AndVersionArr[0]) === 4 && parseInt(AndVersionArr[1]) >= 4)) {
            state.isHighVersion = true
            state.isShowUpdateDialog = false
          } else {
            if (isShowUpdateDialog === 0) {
              // this.$store.commit({
              //   type: 'showUpdateDialog',
              //   isShowUpdateDialog: true
              // })
              state.isShowUpdateDialog = true
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  [hideSettingBtn] (state) {
    state.isShowSetting = false
  },
  // 设置发现页/监控页面
  [settingFindPageTab] (state, obj) {
    console.log(state)
    if (obj.index !== state.indexTabNum) {
      apiList.changeSettingMenu({
        flag: 1,
        configId: obj.configId,
        detailId: obj.detailId
      })
        .then((res) => {
          let CommunicateData = res.data
          console.log(CommunicateData, 'settingFindPageTab')

          state.indexTabNum = obj.index
          var appId = obj.index
          // 和原生交互
          var method = 'conditionHomeDefaultDisplay'
          var params = {'defaultIndex': appId}
          window.HBMBBridge.callApp(method, params, function (err, result) {
            if (err) {
              state.isShowSetting = false
            } else {
              // state.indexTabState = index
              // 和原生交互成功，弹出提示窗口
              state.isShowSetting = false
              state.isShowSettingTip = true
              state.tipText = '设置成功'
              setTimeout(function () {
                state.isShowSettingTip = false
              }, 1500)
            }
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  // 经验交流当前下标加1
  [incrementCommunicateCurrentType] (state) {
    ++state.communicateCurrentType
  },
  // 经验交流当前下标减1
  [decrementCommunicateCurrentType] (state) {
    --state.communicateCurrentType
  },
  // reload
  [reload] (state, obj) {
    state.reloadAction = obj.reloadAction
    // console.log(state.reloadAction)
  },
  // 弹出confirm框
  [showConfirmDialog] (state, obj) {
    state.confirmDialogState = obj.confirmDialogState
  },
  // 改变toast显示及文案
  [changeToast] (state, obj) {
    state.tipText = obj.tipText
    state.isShowSettingTip = true
    setTimeout(function () {
      state.isShowSettingTip = false
    }, 1500)
  },
  // 判断是否弹出弹出框
  [initShowIndexDialog] (state, obj) {
    state.isShowDialog = obj.isShowDialog
  },
  // 改变页面动画滑动方向
  [changeSlideDirection] (state, obj) {
    state.slideDirection = obj.slideDirection
  },
  // 获取中签消息
  [getAwardData] (state, obj) {
    state.awardData = obj.awardData
  },
  // 新股中签提醒更新(点击关闭)
  [closeAwardTip] (state) {
    apiList.upDateAwardData()
      .then((res) => {
        let closeState = res.data.status
        if (closeState === 0) {
          state.awardData = []
        }
      })
      .catch(function () {
        // this.$toast(this.errorText)
      })
  },
  // 关闭更新提示
  [closeUpdateDialog] (state) {
    state.isShowUpdateDialog = false
  },
  // 新手体验区 初始化 发现页 banner
  [initBannerData] (state, obj) {
    state.newUserBannerData = obj.bannerData
  },
  // 新手体验用户是否模拟完成状态
  [getUserMockState] (state, obj) {
    state.userMockState = obj.userMockState
  },
  // 设置发现页
  [initSettingMenu] (state, obj) {
    state.settingMenu = obj.settingMenu

    for (var i = 0; i < obj.settingMenu[0].detailList.length; i++) {
      if (obj.settingMenu[0].detailList[i].checked === 1) {
        state.indexTabNum = i
      }
    }
  },
  // 初始化微信通知状态
  [initWechatTriggerState] (state, obj) {
    state.wechatTriggerState = obj.wechatTriggerState
  },
  // 初始化微信开关状态
  [initWechatTriggerOpen] (state, obj) {
    state.wechatTriggerOpen = obj.wechatTriggerOpen
  },
  // 修改微信开关状态
  [changeWechatTriggerPen] (state, obj) {
    state.wechatTriggerOpen = obj.wechatTriggerOpen
  }
}
