import TopicsModel from '../models/topicsModel';
import UserModel from '../models/userModel';

class Topics {
  async getAllTopics(req, res) {
    const { q = '', tab = 'all', page = 1, limit = 10 } = req.query;
    let query = tab !== 'all' ? { tab } : {};
    if (q.trim()) {
      query = Object.assign(query, { $or: [{ title: new RegExp(q) }] });
    }
    try {
      const allTopics = await TopicsModel.find(query, { _id: 0 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ create_at: -1 });
      res.send({
        code: 1,
        message: 'ok',
        data: allTopics,
      });
    } catch (err) {
      res.send({
        code: 0,
        message: '获取文章失败',
        type: 'ERROR_GET_TOPIC_LIST',
      });
    }
  }
  async postOneTopic(req, res) {
    if (!req.session.token_id) {
      res.status(403).send({
        code: 101,
        message: '请登录',
        type: 'ERROR_LOGIN_AUTH',
      });
      return;
    }
    const { login_name, avatar_url, author_id } = await UserModel.findOne({
      author_id: req.session.token_id,
    });
    const topic = Object.assign(req.body, {
      author: { login_name, avatar_url },
      author_id,
    });
    try {
      const data = await TopicsModel.create(topic);
      res.send({
        msg: 'ok',
        code: 1,
        data,
      });
    } catch (err) {
      res.send({
        code: 0,
        message: '添加文章失败',
        type: 'ERROR_POST_TOPIC',
      });
    }
  }
  deleteOneTopic(req, res) {
    if (!req.session.token_id) {
      res.status(403).send({
        code: 101,
        message: '请登录',
        type: 'ERROR_LOGIN_AUTH',
      });
      return;
    }
    const id = req.params.id;
    TopicsModel.findByIdAndRemove(id, err => {
      if (err) {
        res.send({
          code: 0,
          message: '删除文章失败',
          type: 'ERROR_DELETE_TOPIC',
        });
      }
      res.send({
        msg: 'ok',
        code: 1,
        data: id,
      });
    });
  }
  async updateOneTopic(req, res) {
    if (!req.session.token_id) {
      res.status(403).send({
        code: 101,
        message: '请登录',
        type: 'ERROR_LOGIN_AUTH',
      });
      return;
    }
    const id = req.params.id;
    const { login_name, avatar_url, author_id } = await UserModel.findOne({
      author_id: req.session.token_id,
    });
    const topic = Object.assign(req.body, {
      author: { login_name, avatar_url },
      author_id,
    });
    TopicsModel.findOneAndUpdate({ id }, topic, err => {
      if (err) {
        res.send({
          code: 0,
          message: '修改文章失败',
          type: 'ERROR_PUT_TOPIC',
        });
        return;
      }
      res.send({
        msg: 'ok',
        code: 1,
        data: id,
      });
    });
  }
  async getOneTopic(req, res) {
    const id = req.params.id;
    try {
      const data = await TopicsModel.findOne({ id });
      await TopicsModel.findOneAndUpdate(
        { id },
        { visit_count: (data.visit_count += 1) }
      );
      res.send({
        msg: 'ok',
        code: 1,
        data,
      });
    } catch (err) {
      res.send({
        code: 0,
        message: '获取文章失败',
        type: 'ERROR_GET_TOPIC',
      });
    }
  }
}

export default new Topics();
