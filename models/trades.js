const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
  bookId: String,
  solicitorId: String,
});

module.exports = mongoose.model('trade', tradeSchema);
