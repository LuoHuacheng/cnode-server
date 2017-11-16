import TopicsModel from '../../models/topicsModel'
import { Error } from 'mongoose'

class Topics {
  async getAllTopics (req, res, next) {
    const { q = '', tab = 'all', page = 1, limit = 10 } = req.query
    let query = tab !== 'all' ? { tab } : {}
    if (q.trim()) {
      query = Object.assign(query, { $or: [{ title: new RegExp(q) }] })
    }
    try {
      const allTopics = await TopicsModel.where(query).skip((page - 1) * limit).limit(parseInt(limit))
      res.send({
        code: 1,
        message: 'ok',
        data: allTopics
      })
    } catch (err) {
      res.send({
        code: 0,
        message: new Error(err),
        type: 'ERROR_GET_TOPIC_LIST'
      })
    }
  }
  async postOneTopics (req, res, next) {
    console.log(req.body)
    try {
      const data = await TopicsModel.create(req.body)
      res.send({
        msg: 'ok',
        code: 1,
        data
      })
    } catch (err) {
      res.send({
        code: 0,
        message: '添加文章失败',
        type: 'ERROR_POST_TOPIC'
      })
    }
  }
}

export default new Topics()
