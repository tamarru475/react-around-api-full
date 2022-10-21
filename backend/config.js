const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env' )});
const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = { NODE_ENV, JWT_SECRET };