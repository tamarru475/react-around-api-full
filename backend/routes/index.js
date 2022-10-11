const mainRouter = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

mainRouter.use(usersRouter, cardsRouter);

module.exports = mainRouter;
