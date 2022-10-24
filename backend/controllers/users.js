const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modles/user');
const { NODE_ENV, JWT_SECRET } = require('../config');

const ValidationError = 400;
const ErrorNotFound = 404;
const SeverError = 500;
const AuthorizationError = 401;

module.exports.createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({ email, password: hash, name, about, avatar })
      .then((user) => {
        delete user[password];
        console.log(user);
        res.send({ user });
      })
      .catch((err) => res.status(SeverError).send({ message: `An error has occurred on the server  ${err.message}` }))
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ValidationError).send({ message: 'Error bad request, a validation error has occured' });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user);
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res.send({ token, user });
    })
    .catch((err) => {
      return res.status(AuthorizationError).send({ message: err.message });
    })
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.send({ users }))
    .catch((err) => {
      if (err.name === 'Error not Found') {
        return res.status(ErrorNotFound).send({ message: 'Error not found' });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.getOneUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'Error not found') {
        return res.status(ErrorNotFound).send({ message: 'Error not found, there is no user with this Id' });
      } if (err.name === 'CastError') {
        return res.status(AuthorizationError).send({ message: `The Id number provided is invalid ${req.user_id}` });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findOne({ _id: req.user._id })
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then(user => res.send(user))
    .catch((err) => {
      if (err.name === 'Error not Found') {
        return res.status(ErrorNotFound).send({ message: 'Error not found' });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
}

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, {
    runValidators: true,
    new: true,
    upsert: true,
    rawResult: true,
  })
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((updatedUser) => res.send(updatedUser.value))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ValidationError).send({ message: 'Error bad request, a validation error has occured' });
      } if (err.name === 'Error not found') {
        return res.statu(err.statusCode).send({ message: `${err.name} ${err.statusCode} has accured ${err.message}` });
      } if (err.name === 'CastError') {
        return res.status(err.statusCode).send(err.message, req.user._id);
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, {
    runValidators: true,
    new: true,
    upsert: true,
    rawResult: true,
  })
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((updatedUser) => res.send(updatedUser.value))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ValidationError).send({ message: 'Error bad request, a validation error has occured' });
      } if (err.name === 'Error not found') {
        return res.statu(err.statusCode).send({ message: `${err.name} ${err.statusCode} has accured ${err.message}` });
      } if (err.name === 'CastError') {
        return res.status(ValidationError).send({ message: 'The Id number provided is invalid' });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};
