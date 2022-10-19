const cardsRouter = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');


cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', createCard);

cardsRouter.put('/cards/:cardId/likes', likeCard);

cardsRouter.delete('/cards/:cardId/likes', dislikeCard);

cardsRouter.delete('/cards/:cardId', deleteCardById);

module.exports = cardsRouter;
