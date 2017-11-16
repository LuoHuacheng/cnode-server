import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TopicsSchema = new Schema(
  {
    author: {
      login_name: {
        type: String,
        index: true
      },
      avatar_url: String
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
