const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modles/user');
const { NODE_ENV, JWT_SECRET } = require('../config');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError('user already exists');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email, password: hash, name, about, avatar,
        })
          .then((user) => {
            res.send({
              _id: user._id,
              email: user.email,
              name: user.name,
              about: user.about,
              avatar: user.avatar,
            });
          })
          .catch((err) => next(err)));
    })
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        },
      });
    })
    .catch((err) => next(err));
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError('No users found');
    })
    .then((users) => res.send({ users }))
    .catch((err) => next(err));
};

module.exports.getOneUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('No user with that id');
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail(() => {
      throw new NotFoundError('No user with that id');
    })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, {
    runValidators: true,
    new: true,
    upsert: true,
    rawResult: true,
  })
    .orFail(() => {
      throw new NotFoundError('No user with that id');
    })
    .then((updatedUser) => res.send(updatedUser.value))
    .catch((err) => next(err));
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, {
    runValidators: true,
    new: true,
    upsert: true,
    rawResult: true,
  })
    .orFail(() => {
      throw new NotFoundError('No user with that id');
    })
    .then((updatedUser) => res.send(updatedUser.value))
    .catch((err) => next(err));
};
