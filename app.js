const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('express').Router();
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const {
  createUser, login,
} = require('./controllers/users');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/', users);
app.use('/', cards);
router.use('*', (res, req) => {
  res.status(404).send({ message: `Страница ${req.baseUrl} не найдена` });
});
app.use(errors());
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Передан некорректный токен' });
  }
  if (err.name === 'NotFoundError') {
    return res.status(404).send({ message: 'Пользователь не найден' });
  }
  if (err.code === 11000) {
    return res.status(409).send({ message: 'Имейл уже зарегестрирован' });
  }
  return res.status(500).send({ message: 'Произошла ошибка' });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});
