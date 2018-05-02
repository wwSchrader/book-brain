const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

router.use('/api/books', require('./books.js'));
router.use('/api/users', require('./users.js'));

module.exports = router;
