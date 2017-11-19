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
    const user = await UserModel.findOne({ login_name: req.body.login_name })
    if (user && user.login_name === req.body.login_name) {
      res.send({
        msg: '该用户已存在',
        code: 201,
        data: null
      })
    }
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
      const userInfo = await UserModel.findOne({ login_name, password })
      req.session.regenerate(() => {
        req.session.token_id = userInfo.author_id
        req.session.save()
        res.send({
          msg: 'ok',
          code: 1,
          data: {
            login_name: userInfo.login_name,
            token_id: req.session.token_id
          }
        })
      })
    } catch (err) {
      res.send({
        code: 0,
        message: '登录失败',
        type: 'ERROR_USER_LOGIN'
      })
    }
  }
  async logout (req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        res.send({
          msg: '退出登录失败',
          code: 104,
          data: null
        })
        return
      }
      res.send({
        msg: '退出成功',
        code: 1,
        data: null
      })
    })
  }
}

export default new User()
