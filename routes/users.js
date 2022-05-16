const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, patchUser, patchAvatar, getUser, getCurrentUser,
} = require('../controllers/users');

router.get('/users', getAllUsers);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), patchAvatar);

router.get('/users/me', getCurrentUser);

module.exports = router;
