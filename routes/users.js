const router = require('express').Router();
const {
  createUser, getAllUsers, patchUser, patchAvatar, getUser,
} = require('../controllers/users');

router.get('/users', getAllUsers);

router.get('/users/:userId', getUser);

router.post('/users', createUser);

router.patch('/users/me', patchUser);

router.patch('/users/me/avatar', patchAvatar);

module.exports = router;
