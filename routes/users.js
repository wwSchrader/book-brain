const express = require('express');
const router = express.Router();
const User = require('../models/users');
const saltRounds = 10;
const sanitize = require('express-mongo-sanitize');
const bcrypt = require('bcrypt');

// Register user using local strategy
router.put('/register/local', function(req, res, next) {
  User.findOne({username: sanitize(req.body.username)}, (err, user) => {
    if (user) {
      res.json({'REGISTERED': 'DUPLICATE'});
    } else {
      bcrypt.hash(req.body.password, saltRounds).then((hash) => {
        let newUser = new User({
          authentication: {
            local: {
              email: req.body.username,
              password: hash,
            },
          },
        });
        newUser.save((err) => {
          if (err) {
            console.log('Error saving new user on local strategy: ' + err);
            res.json({'ERROR': 'Server Error'});
          } else {
            res.json({'REGISTERED': 'COMPLETE'});
          }
        });
      });
    }
  });
});

module.exports = router;
