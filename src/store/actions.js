// 异步模拟修改用户登录状态
const mockAsync = 'mockAsync'
export const actions = {
  [mockAsync] ({commit}) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        commit('asyncChangeUserLoginState')
        resolve()
      }, 0)
    })
  }
}
