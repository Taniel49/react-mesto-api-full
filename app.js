const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('express').Router();
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6273f7158a9095fb2ba1710d',
  };

  next();
});
app.use('/', users);
app.use('/', cards);
router.use('*', (res, req) => {
  res.type('application/json').status(404).send({ message: `Страница ${req.baseUrl} не найдена` });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});
