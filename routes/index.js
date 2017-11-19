import Topics from '../controller/topicsCtrl'
import User from '../controller/userCtrl'

export default app => {
  app.get('/', Topics.getAllTopics)
  app.post('/topic', Topics.postOneTopic)
  app.delete('/topic/delete/:id', Topics.deleteOneTopic)
  app.put('/topic/update/:id', Topics.updateOneTopic)
  app.get('/topic/:id', Topics.getOneTopic)
  app.get('/user/:name', User.getUser)
  app.post('/register', User.register)
  app.post('/login', User.login)
  app.get('/logout', User.logout)
}
