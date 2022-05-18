const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const CastError = require('../errors/CastError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new ValidationError('Неверные данные');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Неверные данные'));
      }
    });
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      Card.findOneAndRemove({ _id: req.params.cardId })
        .then(() => {
          if (!card) {
            throw new NotFoundError('NotFoundError');
          }
          res.send({ data: card });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('Неверные данные'));
          }
          if (err.name === 'NotFoundError') {
            next(new NotFoundError('NotFoundError'));
          }
          if (err.name === 'CastError') {
            next(new CastError('Неверный ID'));
          }
        });
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
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('NotFoundError'));
      }
      if (err.name === 'CastError') {
        next(new CastError('Неверный ID'));
      }
    });
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
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('NotFoundError'));
      }
      if (err.name === 'CastError') {
        next(new CastError('Неверный ID'));
      }
    });
};
