const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
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

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('users', userSchema);
