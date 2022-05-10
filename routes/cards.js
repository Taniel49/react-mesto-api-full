const router = require('express').Router();
const {
  createCard, deleteCard, getAllCards, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getAllCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', putLike);

router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;
