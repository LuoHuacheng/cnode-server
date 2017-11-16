const config = {
  port: 1024,
  url: 'mongodb://localhost:27017/cnode',
  session: {
    name: 'HC',
    secret: 'HC',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  }
}

export default config
