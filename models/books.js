const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookTitle: String,
  bookOwner: String,
  bookThumbnailUrl: String,
  bookInfoUrl: String,
});

module.export = mongoose.model('book', bookSchema);
