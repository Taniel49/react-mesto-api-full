require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const router = require('express').Router();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const ValidationError = require('./errors/ValidationError');
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const {
  createUser, login,
} = require('./controllers/users');

const { PORT = 8008, BASE_PATH } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'https://mesto-frontend.onrender.com',
    credentials: true,
  }),
);

mongoose.connect(
  'mongodb://SG-sheer-noodle-2009-54214.servers.mongodirector.com:27017/admin',
  {
    useNewUrlParser: true,
    auth: {
      authdb: 'admin',
      username: 'admin',
      password: 'ax1MaHzlVbqecX0T',
    },
  },
);

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    // eslint-disable-next-line
    avatar: Joi.string().regex(/(http(s)?):\/\/(www\.)?[a-zA-Z0-9\-.]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*#?)/),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

app.use('/', auth, users);
app.use('/', auth, cards);
app.use(errorLogger);
// eslint-disable-next-line no-unused-vars
router.use('*', (res, req, next) => {
  next(new ValidationError('Страница не найдена'));
});
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});
