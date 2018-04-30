const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const googleBookApi = 'https://www.googleapis.com/books/v1/volumes?q=';

// GET book from google book api
router.get('/getbook/:bookTitle', function(req, res, next) {
  let findBookApi = googleBookApi + req.params.bookTitle;

  fetch(findBookApi)
  .then((resp) => resp.json())
  .then((bookSearchResults) => {
    let firstSearchResult = bookSearchResults.items[0].volumeInfo;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      bookTitle: firstSearchResult.title,
      bookThumbnailUrl: firstSearchResult.imageLinks.thumbnail,
      bookInfoUrl: firstSearchResult.infoLink,
    });
  })
  .catch((error) => {
    console.log('Error calling Google Book Api' + error);
    res.sendStatus(401);
  });
});

module.exports = router;
