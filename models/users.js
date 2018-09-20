const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  authentication: {
    local: {
      email: String,
      password: String,
    },
    facebook: {
      profileId: String,
    },
  },
});

module.exports = mongoose.model('users', userSchema);
