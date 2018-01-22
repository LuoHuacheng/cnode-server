const config = {
  port: 1024,
  url: 'mongodb://localhost:27017/cnode',
  session: {
    name: 'SID',
    secret: 'SID',
    resave: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  },
};

export default config;
