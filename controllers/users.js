const mongoose = require('mongoose');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('NotFoundError');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.find({ _id: req.params.objectId })
    .then((user) => {
      if (mongoose.Types.ObjectId.isValid) {
        throw new ValidationError('ValidationError');
      }
      if (!user) {
        throw new NotFoundError('NotFoundError');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (mongoose.Types.ObjectId.isValid) {
        throw new ValidationError('ValidationError');
      }
      if (!user) {
        throw new NotFoundError('NotFoundError');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (mongoose.Types.ObjectId.isValid) {
        throw new ValidationError('ValidationError');
      }
      if (!user) {
        throw new NotFoundError('NotFoundError');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
