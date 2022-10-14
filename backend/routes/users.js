const usersRouter = require('express').Router();
const {
  getUsers, getOneUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');


usersRouter.get('/users', getUsers);

usersRouter.get('/users/:id', getOneUser);

usersRouter.patch('/users/me', updateUserInfo);

usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
