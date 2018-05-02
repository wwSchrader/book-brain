const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const User = require('../models/users');

chai.use(chaiHttp);

describe('Books', function() {
  it('should get book from api on /api/books/getbook/<bookName> GET',
    function(done) {
      chai.request(server)
        .get('/api/books/getbook/bible')
        .end(function(err, res) {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('bookTitle');
          res.body.bookTitle.should.be.a('string');
          res.body.should.have.property('bookThumbnailUrl');
          res.body.bookThumbnailUrl.should.be.a('string');
          res.body.should.have.property('bookInfoUrl');
          res.body.bookInfoUrl.should.be.a('string');
          done();
      });
  });
});

describe('Users', function() {
  before(function(done) {
    User.collection.drop();
    done();
  });

  beforeEach(function(done) {
    let newUser = new User({
      username: 'existingUser@gmail.com',
      authentication: {
        local: {
          email: 'existingUser@gmail.com',
          password: 'asimplepassword123',
        },
      },
    });
    newUser.save(function(err) {
      done();
    });
  });

  afterEach(function(done) {
    User.collection.drop();
    done();
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

  it('should login user using local passport ' +
      'strategy on /api/users/login/local GET',
      function(done) {
        chai.request(server)
          .get('api/users/login/local')
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
        .get('api/users/login/local')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          username: 'existingUser@gmail.com',
          password: 'wrongpassword',
        })
        .end(function(err, res) {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('isLoggedIn');
          res.body.isLoggedIn.should.be.a('false');
          res.body.isLoggedIn.should.equal(true);
          done();
        });
    }
  );

  it('should reject login based on wrong username using local passport ' +
  'strategy on /api/users/login/local GET',
  function(done) {
    chai.request(server)
      .get('api/users/login/local')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'wrongusername@gmail.com',
        password: 'wrongpassword',
      })
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('isLoggedIn');
        res.body.isLoggedIn.should.be.a('false');
        res.body.isLoggedIn.should.equal(true);
        done();
      });
  }
  );
});
