const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../library');
const Trade = require('../models/trades');
const Book =require('../models/books');

// POST trade into database
router.post('/propose', ensureAuthenticated, function(req, res, next) {
  Book.find({id: req.body.bookWanted}, function(err, bookSearchResult) {
    if (err || !bookSearchResult) {
      console.log('Error in finding book to trade');
      res.json({tradePosted: false});
    } else {
      Book.find({id: req.body.bookToGiveUp}, function(err, bookSearchResult) {
        if (err || !bookSearchResult) {
          console.log('Error in finding book to offer to trade');
          res.json({tradePosted: false});
        } else {
          Trade.create({
            solicitorBookId: req.body.bookWanted,
            solicitorId: req.userId,
            bookToTradeId: req.body.bookToGiveUp,
          })
          .then((tradeResult) => {
            res.json({tradePosted: true});
          })
          .catch((err) => {
            console.log('Error in saving trade' + err);
            res.json({tradePosted: false});
          });
        }
      });
    }
  });
});

module.exports= router;
