const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new ValidationError('Неверные данные');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (req.params.cardId !== card.owner) { throw new ValidationError('ValidationError'); }
      Card.findOneAndRemove({ _id: req.params.cardId })
        .then(() => {
          if (!card) {
            throw new NotFoundError('NotFoundError');
          }
          res.send({ data: card });
        })
        .catch((err) => next(err));
    });
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('NotFoundError');
      }
      if (!mongoose.Types.ObjectId.isValid) {
        throw new ValidationError('Неверный ID');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('NotFoundError');
      }
      if (!mongoose.Types.ObjectId.isValid) {
        throw new ValidationError('Неверный ID');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};
