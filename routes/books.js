const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const googleBookApi = 'https://www.googleapis.com/books/v1/volumes?q=';
const BookSearch = require('../models/bookSearch');
const {ensureAuthenticated} = require('../library');

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

module.exports = router;
