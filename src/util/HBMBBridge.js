/**
 * Created by Neo on 2018/09/16.
 */
const HBAPPANDROIDBRIDGENAME = "hb_mb_bridge";
const HBAPPIOSBRIDGENAME = "hb_mb_bridge";
(function (win) {
  var ua = navigator.userAgent;

  function isAndroid() {
    return ua.indexOf("Android") > 0;
  }

  function isIOS() {
    return /(iPhone|iPad|iPod)/i.test(ua);
  }

  function check_iOS_webkit() {
    return isIOS() && (typeof window.webkit !== "undefined") && (typeof window.webkit.messageHandlers !== "undefined") && ((typeof window.webkit.messageHandlers[HBAPPIOSBRIDGENAME] !== "undefined") === true);
  }

  var mobile = {
    check_webkit: function () {
      return check_iOS_webkit();
    },
    checkAppRouterValidity: function () {
      if (isAndroid() && (typeof win[HBAPPANDROIDBRIDGENAME] !== "undefined") === true) {
        return true;
      }
      else if (isIOS() && (typeof win[HBAPPIOSBRIDGENAME] !== "undefined") === true) {
        return true;
      }
      else if (check_iOS_webkit()) {
        return true;
      } else {
        return false;
      }
    },

    /**
     *通过bridge调用app端的方法
     * @param method
     * @param params
     * @param callback
     */
    callApp: function (method, params, callback) {
      if (!this.checkAppRouterValidity()) {
        if (typeof callback === "function") {
          callback("bridge is not available!", null);
        }
        return;
      }
      var req = {
        Method: method,
        Data: params
      };
      var cbName = null;
      if (isIOS()) {
        var ios_bridge = win[HBAPPIOSBRIDGENAME];
        if (typeof ios_bridge !== "undefined" && ios_bridge.callRouter) {
          ios_bridge
            .callRouter(req, function (err, result) {
              var resultObj = null;
              var errorMsg = null;
              if (typeof result !== "undefined" && result !== "null" && result !== null) {
                resultObj = JSON.parse(result);
                if (resultObj) {
                  resultObj = resultObj.result;
                }
              }
              if (err !== "null" && typeof err !== "undefined" && err !== null) {
                errorMsg = err;
              }
              if (typeof callback === "function") {
                callback(err, resultObj);
              }
            });
        } else {
          //生成回调函数方法名称
          cbName = "CB_iOS_" + Date.now() + "_" + Math.ceil(Math.random() * 10);
          //挂载一个临时函数到window变量上，方便app回调
          win[cbName] = function (err, result) {
            console.log(err);
            console.log(result);
            var resultObj;
            if (typeof result !== "undefined" && result !== null) {
              try {
                resultObj = JSON.parse(result).result;
              } catch (error) {
                resultObj = result;
              }
            }
            if (typeof callback === "function") {
              callback(err, resultObj);
            }
            //回调成功之后删除挂载到window上的临时函数
            delete win[cbName];
          };
          req.CB_iOS = cbName;
          window
            .webkit
            .messageHandlers[HBAPPIOSBRIDGENAME]
            .postMessage(req);
        }

      } else if (isAndroid()) {
        //生成回调函数方法名称
        cbName = "CB_" + Date.now() + "_" + Math.ceil(Math.random() * 10);
        //挂载一个临时函数到window变量上，方便app回调
        win[cbName] = function (err, result) {
          var resultObj;
          if (typeof result !== "undefined" && result !== null) {
            resultObj = JSON.parse(result).result;
          }
          if (typeof callback === "function") {
            callback(err, resultObj);
          }
          //回调成功之后删除挂载到window上的临时函数
          delete win[cbName];
        };
        win[HBAPPANDROIDBRIDGENAME].callRouter(JSON.stringify(req), cbName);
      }
    },
    callAppSync: function (method, params) {
      if (!this.checkAppRouterValidity()) {
        return {errMsg: "bridge is not available!"};
      }
      var req = {
        Method: method,
        Data: params
      };
      var responseJSONObj = null,
        response = null;
      if (isIOS()) {
        var ios_bridge = win[HBAPPIOSBRIDGENAME];
        var callRouterSyncFunc = ios_bridge.callRouterSync;
        if (callRouterSyncFunc) {
          responseJSONObj = callRouterSyncFunc(req);
          response = responseJSONObj;
          return response;
        } else {
          var method_func = ios_bridge[method];
          if (method_func) {
            var result = method_func(params);
            var result_obj;
            try {
              result = JSON.parse(result);
              result_obj = {
                result: result
              };
            } catch (error) {
              result_obj = {
                result: result
              };
            }
            return result_obj;
          } else {
            return {errMsg: "method is not exist!"};
          }
        }

      } else if (isAndroid()) {
        responseJSONObj = win[HBAPPANDROIDBRIDGENAME].callRouterSync(JSON.stringify(req));
        response = JSON.parse(responseJSONObj);
        return response;
      }
    }
  };
  //将mobile对象挂载到window全局
  win.HBMBBridge = mobile;

})(window);
let winHbridge = window.HBMBBridge
export const windowHbridge = winHbridge
