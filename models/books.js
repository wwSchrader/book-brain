const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookTitle: String,
  bookThumbnailUrl: String,
  bookInfoUrl: String,
  bookOwner: String,
});

module.exports = mongoose.model('book', bookSchema);
