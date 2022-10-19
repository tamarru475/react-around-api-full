const usersRouter = require('express').Router();
const {
  getUsers, getOneUser, updateUserInfo, updateUserAvatar, getCurrentUser
} = require('../controllers/users');


usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getCurrentUser);

usersRouter.patch('/users/me', updateUserInfo);

usersRouter.patch('/users/me/avatar', updateUserAvatar);

usersRouter.get('/users/:id', getOneUser);

module.exports = usersRouter;
