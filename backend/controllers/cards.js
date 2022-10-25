const Card = require('../modles/card');


module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((cards) => {
      res.send(cards);
    })
    .catch(err => next(err))

};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch(err => next(err))

};

module.exports.deleteCardById = (req, res, next) => {
  if (req.user_id !== req.params.cardId.owner) {
    return res.status(AuthorizationError).send({ message: 'Authorization error' });
  }
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error('no card with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ card }))
    .catch(err => next(err))
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('no card with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((liked) => res.send(liked))
    .catch(err => next(err))
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((dislikeCard) => res.send(dislikeCard))
    .catch(err => next(err))

};
