import TopicsModel from '../../models/topicsModel'

const Topics = {
  async getAllTopics (req, res, next) {
    console.log(1)
    const { tab = 'all', page = 1, limit = 10 } = req.query
    try {
      const allTopics = await TopicsModel.where(tab !== 'all' ? { tab } : {})
      allTopics.skip((page - 1) * limit)
      allTopics.limit(parseInt(limit))
      allTopics.exec((err, data) => {
        if (err) {
          return next(err)
        }
        res.send({
          code: 1,
          message: 'ok',
          data
        })
      })
    } catch (err) {
      res.send({
        code: 0,
        message: '获取文章列表失败',
        type: 'ERROR_GET_TOPIC_LIST'
      })
    }
  },
  async postOneTopics (req, res, next) {
    try {
      const data = await TopicsModel.create(req.body)
      res.send({
        msg: 'ok',
        code: 0,
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

export default Topics
