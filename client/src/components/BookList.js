import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteAUserBook} from '../redux/actions/index';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.decideToRenderAButton = this.decideToRenderAButton.bind(this);
    this.decideToRenderDeleteOrTradeButton =
      this.decideToRenderDeleteOrTradeButton.bind(this);
  }
  handleInfoButtonClick(bookInfoUrl) {
    let win = window.open(bookInfoUrl, '_blank');
    win.focus();
  }

  decideToRenderAButton(bookId) {
    // if logged in, return a button
    if (this.props.isLoggedIn) {
      return this.decideToRenderDeleteOrTradeButton(bookId);
    } else {
      return null;
    }
  }

  decideToRenderDeleteOrTradeButton(bookId) {
    // if in MyBooks Component, return delete button
    if (this.props.parentComponent === 'MyBooks') {
      return <button onClick={() => this.props.deleteAUserBook(bookId)}>Delete</button>;
    } else if (this.props.parentComponent === 'Home') {
      // return trade button if in Home Component
      return <button>Trade</button>;
    } else {
      return null;
    }
  }

  render() {
    if (this.props.bookArray.length === 0) {
      return <h3>No Books!</h3>;
    } else {
      return (
        <div>
          {this.props.bookArray.map((book) => {
            return (
              <div key={book.bookOwner + book.bookInfoUrl}>
                <h3>{book.bookTitle}</h3>
                <img
                    src={book.bookThumbnailUrl}
                    alt={'Book cover of ' + book.bookTitle}
                />
                <button
                    onClick={() => this.handleInfoButtonClick(book.bookInfoUrl)}
                >Book Info</button>
                {this.decideToRenderAButton(book._id)}
              </div>
            );
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userIsLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAUserBook: (bookId) => dispatch(deleteAUserBook(bookId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
