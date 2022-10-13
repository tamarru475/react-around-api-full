const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middleware/logger');
const mainRouter = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const limiter = require('./rateLimit');
const centralizedError = require('./middleware/centralizedErrors');
const { errors } = require('celebrate');

var cors = require('cors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({ origin: '*' }));
app.options('*', cors());

app.use(helmet());
app.use(limiter);
app.disable('x-powered-by');
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());

app.use(requestLogger);

app.post('/signup', createUser);
app.post('/login', login);

app.use(auth);

app.use('/', mainRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use(errorLogger);
app.use(errors());
app.use(centralizedError);

app.listen(PORT);
