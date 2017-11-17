import Topics from '../controller/topicsCtrl'
import User from '../controller/userCtrl'

export default app => {
  app.get('/', Topics.getAllTopics)
  app.post('/topic', Topics.postOneTopics)
  app.get('/user/:name', User.getUser)
  app.post('/user', User.register)
  app.post('/login', User.login)
}
