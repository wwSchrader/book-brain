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
