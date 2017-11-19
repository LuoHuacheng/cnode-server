import mongoose from 'mongoose'
import md5 from 'md5'

const Schema = mongoose.Schema

function getRandom (min, max) {
  return Math.random() * (max - min) + min
}

const UserSchema = new Schema({
  login_name: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 4,
    index: true
  },
  password: {
    type: String,
    required: true,
    maxlength: 18,
    minlength: 6
  },
  avatar_url: {
    type: String,
    default: `https://picsum.photos/60/60?image=${parseInt(getRandom(1, 1e3), 10)}`
  },
  create_at: {
    type: Date,
    default: new Date()
  },
  status: {
    type: Number,
    default: 0
  },
  author_id: {
    type: String,
    default: md5(new mongoose.Types.ObjectId()).substr(4, 24)
  }
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
