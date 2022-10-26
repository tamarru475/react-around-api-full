const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getOneUser, updateUserInfo, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');
const ValidationError = require('../errors/validation-error');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getCurrentUser);

usersRouter.patch('/users/me', updateUserInfo);

usersRouter.patch('/users/me/avatar', updateUserAvatar);

usersRouter.get('/users/:id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).error(new ValidationError('Invalid ID')),
  }),
}), getOneUser);

module.exports = usersRouter;
