const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const googleBookApi = 'https://www.googleapis.com/books/v1/volumes?q=';
const BookSearch = require('../models/bookSearch');
const {ensureAuthenticated} = require('../library');
const Book =require('../models/books');

// GET book from google book api
router.get('/getbook/:bookTitle',
  ensureAuthenticated,
  function(req, res, next) {
    let findBookApi = googleBookApi + req.params.bookTitle;

    fetch(findBookApi)
    .then((resp) => resp.json())
    .then((bookSearchResults) => {
      let searchResults = bookSearchResults.items.map((individualBook) => {
        return {
          bookTitle: individualBook.volumeInfo.title,
          bookThumbnailUrl: individualBook.volumeInfo.imageLinks.thumbnail,
          bookInfoUrl: individualBook.volumeInfo.infoLink,
        };
      });

      let newBookSearch = new BookSearch({
        searchUserId: req.userId,
        bookSearchResults: searchResults,
      });

      newBookSearch.save((err) => {
        if (err) {
          console.log('Error saving search results: ' + err);
          res.sendStatus(500);
        } else {
          res.json(searchResults);
        }
      });
    })
    .catch((error) => {
      console.log('Error calling Google Book Api' + error);
      res.sendStatus(401);
    });
  }
);

// POST book from search result to database and remove bookSearch object
router.post('/addbook', ensureAuthenticated, function(req, res, next) {
  BookSearch.findOne({userId: req.userId}, function(err, bookSearchResults) {
    if (err || !bookSearchResults) {
      console.log('Error finding search results: ' + err);
      res.sendStatus(500);
    } else {
      let selectedBookResult =
        bookSearchResults.bookSearchResults[req.body.selectedBookIndex];
      let newBook = new Book({
        bookOwner: req.userId,
        bookTitle: selectedBookResult.bookTitle,
        bookThumbnailUrl: selectedBookResult.bookThumbnailUrl,
        bookInfoUrl: selectedBookResult.bookInfoUrl,
      });

      newBook.save()
      .then(function(newBook) {
        bookSearchResults.remove()
        .then(function(bookSearchResults) {
          res.json({bookIsAdded: true});
        })
        .catch(function(err) {
          console.log('Error deleting bookSearch Results: ' + err);
          res.json({bookIsAdded: true}).sendStatus(500);
        });
      })
      .catch(function(err) {
        console.log('Error saving book object to db: ' + err);
        res.json({bookIsAdded: true}).sendStatus(500);
      });
    }
  });
});

// DELETE book from database
router.delete('/deletebook', ensureAuthenticated, function(req, res, next) {
  Book.findById(req.body.bookId, function(err, book) {
    if (err || !book || book.bookOwner !== req.user.id) {
      res.json({bookDeleted: false}).sendStatus(500);
    } else {
      book.remove().then(function() {
        res.json({bookDeleted: true});
      });
    }
  })
  .catch(function(err) {
    console.log('Error finding book: ' + err);
    res.json({bookDeleted: false}).sendStatus(500);
  });
});

module.exports = router;
