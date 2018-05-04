const express = require('express');
const router = express.Router();
const User = require('../models/users');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const passportComponent = require('../component-passport');

// Register user using local strategy
router.put('/register/local', function(req, res, next) {
  User.findOne({username: req.body.username}, (err, user) => {
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

// Login user using local strategy
router.post('/login/local',
  passportComponent.passport
    .authenticate('local', {failWithError: true, flashFailure: true}),
  (req, res) => {
    // handle successful authentication
    return res.json({isLoggedIn: true});
  },
  (err, req, res, next) => {
    // handle failed authentication
    return res.status(401).json({
      isLoggedIn: false,
      authError: req.flash('authMessage')[0],
    });
  }
);

module.exports = router;
