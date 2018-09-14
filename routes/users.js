const express = require('express');
const router = express.Router();
const User = require('../models/users');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const passportComponent = require('../component-passport');
const {ensureAuthenticated} = require('../library');

// Register user using local strategy
router.put('/register/local', function(req, res, next) {
  console.log(req.body);
  console.log("Register path");
  User.findOne({username: req.body.username}, (err, user) => {
    if (user) {
      res.json({'REGISTERED': 'DUPLICATE'});
    } else {
      bcrypt.hash(req.body.password, saltRounds).then((hash) => {
        let newUser = new User({
          username: req.body.username,
          authentication: {
            local: {
              email: req.body.email,
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
    return res.json({isLoggedIn: true, userId: req.user._id});
  },
  (err, req, res, next) => {
    // handle failed authentication
    return res.status(401).json({
      isLoggedIn: false,
      authError: req.flash('authMessage')[0],
    });
  }
);

// Logout user
router.get('/logout', ensureAuthenticated, function(req, res, next) {
  req.logout();
  res.json({isLoggedIn: false});
});

// check to see if user has an existing session
router.get('/checkSession', ensureAuthenticated, function(req, res, next) {
  res.json({isLoggedIn: true});
});

module.exports = router;
