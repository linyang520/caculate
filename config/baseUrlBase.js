// 配置axios
var baseUrl = ''
if (window.APP_CONF.env === 'local') {
  baseUrl = '/api'
} else if (window.APP_CONF.env === 'production') {
  baseUrl = 'https://m.touker.com/marketing/'
} else if (window.APP_CONF.env === 'simulation') {
  baseUrl = 'https://m-wwwtest.touker.com/marketing'
} else if (window.APP_CONF.env === 'development') {
  baseUrl = 'https://m.dev.hbec.com/marketing'
}

export default baseUrl
