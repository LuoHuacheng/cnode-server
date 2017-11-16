import Topics from '../controller/topics'

export default app => {
  app.get('/', Topics.getAllTopics)
  app.post('/topic', Topics.postOneTopics)
}
