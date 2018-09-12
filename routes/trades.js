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
            solicitorId: req.user._id,
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

// GET proposed trades from database
router.get('/getProposed', ensureAuthenticated, function(req, res, next) {
  Book.find({bookOwner: req.user._id}, function(err, books) {
    if (err || !books) {
      res.sendStatus(500);
    } else {
      findTradesLinkedToBooks(books)
        .then((bookArrays) => {
          res.json(bookArrays);
        })
        .catch((err) => {
          console.log('Error in findTradesLinkedToBooks ' + err);
        });
    }
  });
});

router.delete('/deleteTrade', ensureAuthenticated, function(req, res, next) {
  determineIfUserOwnsOneOfTheBooks(req.body.tradeId, req.user._id.toString())
  .then((result) => {
    if (!result) {
      throw new Error('Failed determining owner status');
    } else {
      return deleteTrade(req.body.tradeId);
    }
  })
  .then((result) => {
    if (result) {
      return res.sendStatus(200);
    } else {
       return res.sendStatus(500);
    }
  })
  .catch((err) => {
    console.log('Error in deleting trade' + err);
    return res.sendStatus(500);
  });
});

function determineIfUserOwnsOneOfTheBooks(tradeId, userId) {
  return Trade.findOne({_id: tradeId}).exec()
    .then((trade) => {
      return Promise.all([
        Book.findOne({_id: trade.solicitorBookId}).exec(),
        Book.findOne({_id: trade.bookToTradeId}).exec(),
      ]);
    })
    .then((returnedBookArray) => {
      if (returnedBookArray[0].bookOwner === userId ||
        returnedBookArray[1].bookOwner === userId) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log('Error determining if owner owns one of the books: ' + err);
      return false;
    });
}

// deletes a trade, return true if successful and false if not
function deleteTrade(tradeId) {
  return Trade.deleteOne({_id: tradeId}, function(err, result) {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
}

async function findTradesLinkedToBooks(bookArray) {
  let bookIdArray = bookArray.map((book) => {
    return book.id;
  });

  let requestedTradesArray =
    await getTradesFromDb(bookIdArray, 'solicitorBookId');
  let pendingTradesArray = await getTradesFromDb(bookIdArray, 'bookToTradeId');

  return {
    pendingTradesArray: pendingTradesArray,
    requestedTradesArray: requestedTradesArray,
  };
}

async function getTradesFromDb(bookIdArray, typeOfSearch) {
  return (
    Trade.find({[typeOfSearch]: {$in: bookIdArray}})
    .then(async (trades) => {
      let answer = await Promise.all(trades.map(async (trade) => {
          let solicitorBook = await getBookByIdFromDb(trade.solicitorBookId);
          let bookToTrade = await getBookByIdFromDb(trade.bookToTradeId);
          trade.hereIsTheAnswer = solicitorBook;
          return {
            _id: trade._id,
            bookToTrade: bookToTrade,
            solicitorBook: solicitorBook,
          };
        }));
        return answer;
    })
  );
}

async function getBookByIdFromDb(bookId) {
  return await Book.findOne({_id: bookId}, function(err, book) {
    if (err) {
      console.log('Error in finding book by id: ' + err);
    } else {
      return {
        bookTitle: book.bookTitle,
        bookThumbnailUrl: book.bookThumbnailUrl,
        bookInfoUrl: book.bookInfoUrl,
      };
    }
  }).exec();
}

module.exports= router;
