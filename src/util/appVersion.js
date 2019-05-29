import { isIOS, isAndroid } from './isApp'

export const appVersionBoolean = function appVersionBoolean (version) {
  let userAgent = window.navigator.userAgent
  let versionArr = version.split('.')
  if (isIOS()) {
    let IOSVERSION = userAgent.split('-')[userAgent.split('-').length - 1]
    let IOSVersionArr = IOSVERSION.split('.')
    // if (IOSVersionArr[0] >= versionArr[0] && IOSVersionArr[1] >= versionArr[1] && IOSVersionArr[2] >= versionArr[2]) {
    if ((parseInt(IOSVersionArr[0]) > parseInt(versionArr[0])) || ((parseInt(IOSVersionArr[0]) === parseInt(versionArr[0])) && (parseInt(IOSVersionArr[1]) > parseInt(versionArr[1]))) || ((parseInt(IOSVersionArr[0]) === parseInt(versionArr[0])) && (parseInt(IOSVersionArr[1]) === parseInt(versionArr[1])) && (parseInt(IOSVersionArr[2]) >= parseInt(versionArr[2])))) {
      return true
    } else {
      return false
    }
  } else if (isAndroid()) {
    let ANDROIDVERSION = userAgent.split('-Android-')[1].split('-')[0]
    let AndVersionArr = ANDROIDVERSION.split('.')
    // if (AndVersionArr[0] >= versionArr[0] && AndVersionArr[1] >= versionArr[1] && AndVersionArr[2] >= versionArr[2]) {
    if ((parseInt(AndVersionArr[0]) > parseInt(versionArr[0])) || ((parseInt(AndVersionArr[0]) === parseInt(versionArr[0])) && (parseInt(AndVersionArr[1]) > parseInt(versionArr[1]))) || ((parseInt(AndVersionArr[0]) === parseInt(versionArr[0])) && (parseInt(AndVersionArr[1]) === parseInt(versionArr[1])) && (parseInt(AndVersionArr[2]) >= parseInt(versionArr[2])))) {
      return true
    } else {
      return false
    }
  }
}
