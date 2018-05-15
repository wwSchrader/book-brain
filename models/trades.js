const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
  solicitorBookId: String,
  solicitorId: String,
  bookToTradeId: String,
});

module.exports = mongoose.model('trade', tradeSchema);
