const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  try {
    req.params.cardId = Card.owner;
  } catch (err) {
    return res
      .status(400)
      .send({ message: 'Нет прав на удаление карточки' });
  }
  Card.findOneAndRemove({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('NotFoundError');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
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
      res.send({ data: card });
    })
    .catch((err) => next(err));
};
