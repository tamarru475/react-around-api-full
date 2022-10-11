const jwt = require('jsonwebtoken');
const JWT_SECRET = 'a507fa13bf435809f3ed0497cd414cfe';

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
    return res.status(401).send({ message: 'Authorization required' });
  }

  req.user = payload;

  next();
}