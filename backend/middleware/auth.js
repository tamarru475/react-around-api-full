const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: 'Authorization required' });
  }

  req.user = payload;

  next();
}