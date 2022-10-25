const cardsRouter = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().alphanum().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL)
  }),
}), createCard);

cardsRouter.put('/cards/:cardId/likes', likeCard);

cardsRouter.delete('/cards/:cardId/likes', dislikeCard);

cardsRouter.delete('/cards/:cardId', deleteCardById);

module.exports = cardsRouter;
