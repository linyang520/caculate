import { windowHbridge } from './HBMBBridge'
export default {
  openUrl (url) {
    if (url) {
      try {
        if (windowHbridge && windowHbridge.checkAppRouterValidity()) {
          // 查看最新移动端接口API文档，调用替换的API逻辑
          var params = {'url': url}
          var method = 'openNativeURL'
          windowHbridge.callApp(method, params, function (err, result) {
            if (err) {
              // error handle
            } else {
              // success handle
            }
          })
        } else {
          // 老移动端接口调用逻辑
          hbmobile.openNativeURL(url)
        }
      } catch (e) {
        console.log('调用移动端出错：' + e)
      }
    }
  }
}
