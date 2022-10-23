const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'invalid email']
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9 ,.'-]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid name`,
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9 ,.'-]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid description`,
    },
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: [validator.isURL, 'invalid URL'],
  },
});


userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      console.log(user);
      if (!user) {
        return Promise.reject(new Error('email or password are incorrect 1'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('email or password are incorrect 2'));
          }
          return user;
        })
    })
}

module.exports = mongoose.model('user', userSchema);
