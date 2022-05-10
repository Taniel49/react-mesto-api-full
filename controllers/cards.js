const mongoose = require('mongoose');
const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .then(() => {
      throw new ValidationError('ValidationError');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((user) => res.send({ data: user }))
    .then(() => {
      throw new ValidationError('ValidationError');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findOneAndRemove({ _id: mongoose.Types.ObjectId('6277493aad9bee9354ee8787') })
    .then((user) => res.send({ data: user }))
    .then(() => {
      throw new ValidationError('ValidationError');
    })
    .then(() => {
      throw new NotFoundError('NotFoundError');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => res.send({ data: user }))
    .then(() => {
      throw new ValidationError('ValidationError');
    })
    .then(() => {
      throw new NotFoundError('NotFoundError');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((user) => res.send({ data: user }))
    .then(() => {
      throw new ValidationError('ValidationError');
    })
    .then(() => {
      throw new NotFoundError('NotFoundError');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
