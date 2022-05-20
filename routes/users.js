const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, patchUser, patchAvatar, getUser, getCurrentUser,
} = require('../controllers/users');

router.get('/users', getAllUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
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
    // eslint-disable-next-line
    avatar: Joi.string().required().regex(/(http(s)?):\/\/(www\.)?[a-zA-Z0-9\-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*#?)/),
  }),
}), patchAvatar);

module.exports = router;
