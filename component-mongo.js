const mongoose = require('mongoose');
const db = mongoose.connection;

function setupMongoose(app) {
  mongoose.Promise = global.Promise;
  console.log("Mongo uri: " + process.env.MONGODB_URI);
  mongoose.connect(process.env.MONGODB_URI, {});

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('we\'re connected!');
  });
}

module.exports = {setupMongoose, db};
