const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 1;

chai.use(chaiHttp);

describe('Books', function() {
  this.timeout(10000); // eslint-disable-line no-invalid-this
  let newUser = '';
  let agent = chai.request.agent(server);

  before(function(done) {
    User.collection.drop(function(err) {
      // ignore error if collection doesnt exist
      if (err && err.code !== 26) {
        console.log('Drop collection error: ' + err);
      }
      bcrypt.hash('asimplepassword123', saltRounds).then((hash) => {
        newUser = {
          username: 'existingUser@gmail.com',
          authentication: {
            local: {
              email: 'existingUser@gmail.com',
              password: hash,
            },
          },
        };
        done();
      });
    });
  });

  after(function(done) {
    agent.close();
    User.collection.drop(function(err) {
      done();
    });
  });

  describe('when authenticated', function() {
    before(function(done) {
      let newDbUser = new User(newUser);
      newDbUser.save(function(err) {
        if (err) {
          console.log('Error saving newUser: ' + err);
        }
        done();
      });
    });
    beforeEach(function(done) {
      agent
          .post('/api/users/login/local')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            username: 'existingUser@gmail.com',
            password: 'asimplepassword123',
          })
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('isLoggedIn');
            res.body.isLoggedIn.should.be.a('boolean');
            res.body.isLoggedIn.should.equal(true);
            done();
          });
    });

    it('should get book from api on /api/books/getbook/<bookName> GET',
      function(done) {
        agent
          .get('/api/books/getbook/bible')
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.be.a('object');
            res.body[0].should.have.property('bookTitle');
            res.body[0].bookTitle.should.be.a('string');
            res.body[0].should.have.property('bookThumbnailUrl');
            res.body[0].bookThumbnailUrl.should.be.a('string');
            res.body[0].should.have.property('bookInfoUrl');
            res.body[0].bookInfoUrl.should.be.a('string');
            done();
          });
      }
    );
  });
});

describe('Users', function() {
  let newUser = '';

  before(function(done) {
    User.collection.drop(function(err) {
      // ignore error if collection doesnt exist
      if (err.code !== 26) {
        console.log('Drop collection error: ' + err);
      }
      bcrypt.hash('asimplepassword123', saltRounds).then((hash) => {
        newUser = {
          username: 'existingUser@gmail.com',
          authentication: {
            local: {
              email: 'existingUser@gmail.com',
              password: hash,
            },
          },
        };
        done();
      });
    });
  });

  beforeEach(function(done) {
    let newDbUser = new User(newUser);
    newDbUser.save(function(err) {
      if (err) {
        console.log('Error saving newUser: ' + err);
      }
      done();
    });
  });

  afterEach(function(done) {
    User.collection.drop(function(err) {
      if (err) {
        console.log('Error dropping collection: ' + err);
      }
      done();
    });
  });

  it(
    'should register user using local passport ' +
    'strategy on /api/users/register/local PUT',
    function(done) {
      chai.request(server)
        .put('/api/users/register/local')
        .send({username: 'johndoe@gmail.com', password: 'password123'})
        .end(function(err, res) {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('REGISTERED');
          res.body.REGISTERED.should.be.a('string');
          res.body.REGISTERED.should.equal('COMPLETE');
          done();
        });
    }
  );

  it(
    'should reject register user because of duplicate using local passport ' +
    'strategy on /api/users/register/local PUT',
    function(done) {
      chai.request(server)
        .put('/api/users/register/local')
        .send({username: 'existingUser@gmail.com', password: 'password123'})
        .end(function(err, res) {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('REGISTERED');
          res.body.REGISTERED.should.be.a('string');
          res.body.REGISTERED.should.equal('DUPLICATE');
          done();
        });
    }
  );

  it('should login user using local passport ' +
      'strategy on /api/users/login/local GET',
      function(done) {
        chai.request(server)
          .post('/api/users/login/local')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            username: 'existingUser@gmail.com',
            password: 'asimplepassword123',
          })
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('isLoggedIn');
            res.body.isLoggedIn.should.be.a('boolean');
            res.body.isLoggedIn.should.equal(true);
            done();
          });
      }
  );

  it('should reject login based on wrong password using local passport ' +
    'strategy on /api/users/login/local GET',
    function(done) {
      chai.request(server)
        .post('/api/users/login/local')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          username: 'existingUser@gmail.com',
          password: 'wrongpassword',
        })
        .end(function(err, res) {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('isLoggedIn');
          res.body.isLoggedIn.should.be.a('boolean');
          res.body.isLoggedIn.should.equal(false);
          res.body.should.have.property('authError');
          res.body.authError.should.be.a('string');
          res.body.authError.should.equal('Incorrect password');
          done();
        });
    }
  );

  it('should reject login based on wrong username using local passport ' +
  'strategy on /api/users/login/local GET',
    function(done) {
      chai.request(server)
        .post('/api/users/login/local')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          username: 'wrongusername@gmail.com',
          password: 'wrongpassword',
        })
        .end(function(err, res) {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('isLoggedIn');
          res.body.isLoggedIn.should.be.a('boolean');
          res.body.isLoggedIn.should.equal(false);
          res.body.should.have.property('authError');
          res.body.authError.should.be.a('string');
          res.body.authError.should.equal('Incorrect username');
          done();
        });
    }
  );
});
