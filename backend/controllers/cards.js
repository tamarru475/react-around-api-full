const Card = require('../modles/card');

const ValidationError = 400;
const ErrorNotFound = 404;
const SeverError = 500;
const AuthorizationError = 401;

module.exports.getCards = (req, res) => {
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
    .catch((err) => {
      if (err.name === 'Error not Found') {
        return res.status(ErrorNotFound).send({ message: 'Error not found' });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      ;
      if (err.name === 'ValidationError') {
        return res.status(ValidationError).send({ message: 'Error bad request, a validation error has occured' });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.deleteCardById = (req, res) => {
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
    .catch((err) => {
      if (err.name === 'Error not found') {
        return res.status(ErrorNotFound).send({ message: 'Error not found, there is no card with this Id' });
      } if (err.name === 'CastError') {
        return res.status(ValidationError).send({ message: 'The Id number provided is invalid' });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('no card with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((liked) => res.send(liked))
    .catch((err) => {
      if (err.name === 'Error not found') {
        return res.status(err.statusCode).send({ message: `${err.name} ${err.statusCode} has accured ${err.message}` });
      } if (err.name === 'CastError') {
        return res.status(ValidationError).send({ message: 'The Id number provided is invalid' });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((dislikeCard) => res.send(dislikeCard))
    .catch((err) => {
      if (err.name === 'notFoundError') {
        return res.statu(err.statusCode).send({ message: `${err.name} ${err.statusCode} has accured ${err.message}` });
      } if (err.name === 'CastError') {
        return res.status(ValidationError).send({ message: 'The Id number provided is invalid' });
      }
      return res.status(500).send({ message: 'An error has occurred on the server' });
    });
};
