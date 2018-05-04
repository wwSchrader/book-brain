const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const User = require('./models/users');
const mongoComponent = require('./component-mongo');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

function setupPassport(app) {
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    store: new MongoStore({mongooseConnection: mongoComponent.db}),
  }));

  app.use(flash());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((response) => {
        return done(null, response);
      })
      .catch((ex) => {
        done(ex);
      });
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.all('*', (req, res, next) => {
    req.passport = passport;
    next();
  });

  // Local Strategy
  passport.use(new LocalStrategy(
    {passReqToCallback: true},
    (req, username, password, done) => {
      User.findOne({username: username}, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(
            null,
            false,
            req.flash('authMessage', 'Incorrect username')
          );
        }
        bcrypt.compare(password, user.authentication.local.password)
          .then((passwordMatch) => {
            if (!passwordMatch) {
              return done(null,
                false,
                req.flash('authMessage', 'Incorrect password')
              );
            } else {
              return done(null, user);
            }
          });
      });
    }
  ));
}

module.exports = {setupPassport, passport};
