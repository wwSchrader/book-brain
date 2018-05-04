const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSearchSchema = new Schema({
  searchUserId: String,
  bookSearchResults: [{
    bookTitle: String,
    bookThumbnailUrl: String,
    bookInfoUrl: String,
  }],
});

module.exports = mongoose.model('bookSearch', bookSearchSchema);
