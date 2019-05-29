const ua = navigator.userAgent

export const isApp = ua.indexOf('ToukerAppMobileUserAgent-Qianqian') > 0 || ua.indexOf('StockWarningAppMobileUserAgent') > 0

export const isAndroid = function isAndroid () {
  return ua.indexOf('Android') > 0
}

export const isIOS = function isIOS () {
  return /(iPhone|iPad|iPod)/i.test(ua)
}

export const baseJumpQian = function baseJumpQian () {
  return 'qianqian://x-callback-url/other/webviewControler?defaultHideCloseButton=1&urlString='
}
