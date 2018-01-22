import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import config from './config';
import './mongoDB';
import router from './routes';

const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true); // 可以带cookies
  res.header('X-Powered-By', '4.16.2');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new MongoStore({
      url: config.url,
    }),
  })
);

router(app);

app.listen(config.port, () => {
  const date = new Date();
  console.log(
    `Server runing on port:${config.port} at ${date.toLocaleDateString(
      'zh-CN'
    )} ${date.toLocaleTimeString('en-US')}`
  );
});
