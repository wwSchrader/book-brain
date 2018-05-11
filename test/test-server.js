const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 1;
const BookSearch = require('../models/bookSearch');
const Books = require('../models/books');

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

  describe('when not authenticated', function() {
    it('should get all books from the database on /api/books/getallbooks GET',
      function(done) {
        Books.create([
          {
            bookTitle: '1st book',
            bookThumbnailUrl: '1st Book Thumbnail Url',
            bookInfoUrl: '1st Book Info Url',
            bookOwner: '1st user id',
          },
          {
            bookTitle: '2nd book',
            bookThumbnailUrl: '2nd Book Thumbnail Url',
            bookInfoUrl: '2nd Book Info Url',
            bookOwner: '2nd user id',
          },
        ])
        .then(function(bookArray) {
          chai.request(server)
          .get('/api/books/getallbooks')
          .then(function(res) {
            should.exist(res);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('returnedBooks');
            res.body.returnedBooks.should.be.a('array');
            res.body.array.should.have.lengthOf(2);
            let firstBook = res.body.array[0];
            firstBook.should.be.a('object');
            firstBook.should.have.property('bookTitle');
            first.bookTitle.should.be.a('string');
            firstBook.bookTitle.should.equal('1st book');
            firstBook.should.have.property('bookThumbnailUrl');
            firstBook.bookThumbnailUrl.should.be.a('string');
            firstBook.bookThumbnailUrl.should.equal('1st Book Thumbnail Url');
            firstBook.should.have.property('bookInfoUrl');
            firstBook.bookInfoUrl.should.be.a('string');
            firstBook.bookInfoUrl.should.equal('1st Book Info Url');
            firstBook.should.have.property('bookOwner');
            firstBook.bookOwner.should.be.a('string');
            firstBook.bookOwner.should.equal('1st user id');
            done();
          })
          .catch(function(err) {
            done(err);
          });
        })
        .catch(function(err) {
          done(err);
        });
      }
    );
  });

  describe('when authenticated', function() {
    before(function(done) {
      let newDbUser = new User(newUser);
      newDbUser
        .save()
        .then(function(user) {
          let newSearch = new BookSearch({
            searchUserId: user.id,
            bookSearchResults: [
              {
                bookTitle: 'The Hunt For Red October',
                bookThumbnailUrl: 'www.huntforredoctober.com',
                bookInfoUrl: 'www.octoberinfo.com',
              },
              {
                bookTitle: 'Narnia',
                bookThumbnailUrl: 'www.narnia.com',
                bookInfoUrl: 'www.narniainfo.com',
              },
              {
                bookTitle: 'Bible',
                bookThumbnailUrl: 'www.bible.com',
                bookInfoUrl: 'www.bibleinfo.com',
              },
            ],
          });
          newSearch.save(function(err) {
            if (err) {
              console.log('Error saving a new dummy search to database');
            }
            done();
          });
        }).catch(function(err) {
          console.log('Error setting up a dummy search');
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

    after(function(done) {
      BookSearch.collection.drop();
      Books.collection.drop();
      done();
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

    it(
      'should add selected book from user search ' +
      'to database on /api/books/addbook POST',
      function(done) {
        agent
          .post('/api/books/addbook')
          .send({selectedBookIndex: 1})
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('bookIsAdded');
            res.body.bookIsAdded.should.be.a('boolean');
            res.body.bookIsAdded.should.equal(true);
            done();
          });
      }
    );

    it('should delete a book owned by user on /api/books/deletebook',
      function(done) {
        User.findOne({username: 'existingUser@gmail.com'})
        .then(function(user) {
          let newBook = new Books({
            bookTitle: 'Book To Be Deleted',
            bookThumbnailUrl: 'Book Thumbnail Url',
            bookInfoUrl: 'Book Info Url',
            bookOwner: user.id,
          });

          return newBook.save().then(function(book) {
            return book.id;
          });
        })
        .then(function(bookId) {
          agent
          .delete('/api/books/deletebook')
          .send({bookId: bookId})
          .then(function(res) {
            should.exist(res);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('bookDeleted');
            res.body.bookDeleted.should.be.a('boolean');
            res.body.bookDeleted.should.equal(true);
            done();
          })
          .catch(function(err) {
            console.log('Error saving book: ' + err);
          });
        });
      }
    );

    it('should get books owned by user on /api/books/getownedbooks',
      function(done) {
        User.findOne({username: 'existingUser@gmail.com'})
        .then(function(user) {
          return Books.create([
            {
              bookTitle: 'Book owned by User',
              bookThumbnailUrl: 'Owned Book Thumbnail Url',
              bookInfoUrl: 'Owned Book Info Url',
              bookOwner: user.id,
            },
            {
              bookTitle: 'Book NOT owned by user',
              bookThumbnailUrl: 'Other Book Thumbnail Url',
              bookInfoUrl: 'Other Book Info Url',
              bookOwner: 'SomeOtherUserIdString1235',
            },
          ])
          .then(function(books) {
            return books;
          }).catch(function(err) {
            console.log('Error saving array of books: ' + err);
            done(err);
          });
        })
        .then(function(bookArray) {
          agent
            .get('/api/books/getownedbooks')
            .then(function(res) {
              should.exist(res);
              res.should.have.status(200);
              res.should.be.json;
              res.should.have.property('body');
              res.body.should.be.a('object');
              res.body.should.have.property('returnedBooks');
              res.body.returnedBooks.should.be.a('array');
              res.body.returnedBooks.should.have.lengthOf(1);
              let bkToTst = res.body.returnedBooks[0];
              bkToTst.should.be.a('object');
              bkToTst.should.have.property('bookTitle');
              bkToTst.bookTitle.should.be.a('string');
              bkToTst.bookTitle.should.equal('Book owned by User');
              bkToTst.should.have.property('bookThumbnailUrl');
              bkToTst.bookThumbnailUrl.should.be.a('string');
              bkToTst.bookThumbnailUrl.should.equal('Owned Book Thumbnail Url');
              bkToTst.should.have.property('bookOwner');
              bkToTst.bookOwner.should.equal(bookArray[0].bookOwner);
              done();
            })
            .catch(function(err) {
              console.log('Error in the test getting owner books: ' + err);
              done(err);
            });
        })
        .catch(function(err) {
          console.log('Error Returning owners books.' + err);
          done(err);
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
