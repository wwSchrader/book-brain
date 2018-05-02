const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

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
  it(
    'should register user using local passport' +
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
});
