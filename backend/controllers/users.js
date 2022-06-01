const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const CastError = require('../errors/CastError');
const AuthError = require('../errors/AufError');
const ConflictError = require('../errors/ConflictError');

module.exports.createUser = (req, res, next) => {
  console.log('user');
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send(
        {
          data: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
            email: user.email,
          },
        },
      );
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else next(err);
    });
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('NotFoundError');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('NotFoundError'));
      } else if (err.name === 'CastError') {
        next(new CastError('Неверный ID'));
      } else next(err);
    });
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('NotFoundError');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Неверные данные'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError('NotFoundError'));
      } else if (err.name === 'CastError') {
        next(new CastError('Неверный ID'));
      } else next(err);
    });
};

module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('NotFoundError');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Неверные данные'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError('NotFoundError'));
      } else if (err.name === 'CastError') {
        next(new CastError('Неверный ID'));
      } else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Неверные данные'));
      } else if (err.name === 'AuthError') {
        next(new AuthError('Неправильная почта или пароль'));
      } else if (err.name === 'CastError') {
        next(new CastError('Неверный ID'));
      } else if (err.name === 'Unauthorized') {
        next(new AuthError('Ошибка авторизации'));
      } else next(err);
    });
};
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('NotFoundError');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('NotFoundError'));
      } else if (err.name === 'CastError') {
        next(new CastError('Неверный ID'));
      } else next(err);
    });
};
