const Card = require('../modles/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFoundError('No cards found');
    })
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('No Card with that id');
    })
    .then((usersCard) => {
      if (req.user._id !== usersCard.owner.valueOf()) {
        throw new ForbiddenError('Forbidden Error');
      }
      Card.findByIdAndDelete(req.params.cardId)
        .orFail(() => {
          throw new NotFoundError('No Card with that id');
        })
        .then((card) => {
          res.send({ card });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('No Card with that id');
    })
    .then((liked) => res.send(liked))
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('No Card with that id');
    })
    .then((dislikeCard) => res.send(dislikeCard))
    .catch((err) => next(err));
};
