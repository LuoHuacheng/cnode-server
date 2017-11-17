import UserModel from '../models/userModel'

class User {
  async getUser (req, res, next) {
    const { existed = false } = req.query
    try {
      const userInfo = await UserModel.findOne({ login_name: req.params.name })
      const isExisted = Boolean(Object.keys(userInfo).length)
      res.send({
        code: 1,
        message: 'ok',
        data: existed ? isExisted : userInfo
      })
    } catch (err) {
      res.send({
        code: 0,
        message: '获取用户信息失败',
        type: 'ERROR_GET_USER_INFO'
      })
    }
  }
  async register (req, res, next) {
    try {
      const data = await UserModel.create(req.body)
      res.send({
        msg: 'ok',
        code: 1,
        data
      })
    } catch (err) {
      res.send({
        code: 0,
        message: '添加用户失败',
        type: 'ERROR_POST_USER'
      })
    }
  }
  async login (req, res, next) {
    const { login_name, password } = req.body
    try {
      const userInfo = await UserModel.findOne({ login_name })
      const isExisted = password === userInfo.password
      req.session.token_id = userInfo.author_id
      res.send({
        msg: 'ok',
        code: 1,
        data: isExisted
      })
    } catch (err) {
      res.send({
        code: 0,
        message: '登录失败',
        type: 'ERROR_USER_LOGIN'
      })
    }
  }
}

export default new User()
