import mongoose from 'mongoose'
import md5 from 'md5'

const Schema = mongoose.Schema

const TopicsSchema = new Schema(
  {
    id: {
      type: String,
      default: new mongoose.Types.ObjectId()
    },
    author: {
      login_name: {
        type: String,
        index: true
      },
      avatar_url: String
    },
    author_id: {
      type: String,
      default: md5(new mongoose.Types.ObjectId()).substr(4, 24)
    },
    title: String,
    tab: String,
    content: String,
    good: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    reply_count: {
      type: Number,
      default: 0
    },
    visit_count: {
      type: Number,
      default: 0
    },
    create_at: {
      type: Date,
      default: new Date()
    },
    last_reply_at: Date
  },
  {
    $inc: { id: 1 },
    versionKey: false
  }
)

const TopicsModel = mongoose.model('topics', TopicsSchema)

export default TopicsModel
