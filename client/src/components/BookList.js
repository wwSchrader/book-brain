import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  deleteAUserBook,
  showSelectBookToGiveUpModal,
  setBookIdWanted,
} from '../redux/actions/index';
import SelectBookToGiveUpModal from './SelectBookToGiveUpModal';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.decideToRenderAButton = this.decideToRenderAButton.bind(this);
    this.decideToRenderDeleteOrTradeButton =
      this.decideToRenderDeleteOrTradeButton.bind(this);
    this.decideToRenderDeleteButtonOrOwnedMsg =
      this.decideToRenderDeleteButtonOrOwnedMsg.bind(this);
    this.handleTradeButtonClick = this.handleTradeButtonClick.bind(this);
  }

  handleInfoButtonClick(bookInfoUrl) {
    let win = window.open(bookInfoUrl, '_blank');
    win.focus();
  }

  decideToRenderAButton(bookId, bookOwner) {
    // if logged in, return a button
    if (this.props.isLoggedIn) {
      return this.decideToRenderDeleteOrTradeButton(bookId, bookOwner);
    } else {
      return null;
    }
  }

  decideToRenderDeleteOrTradeButton(bookId, bookOwner) {
    // if in MyBooks Component, return delete button
    if (this.props.parentComponent === 'MyBooks') {
      return (
        <button
            onClick={() => this.props.deleteAUserBook(bookId)}
        >
        Delete
        </button>
      );
    } else if (this.props.parentComponent === 'Home') {
      // return trade button if in Home Component
      return this.decideToRenderDeleteButtonOrOwnedMsg(bookId, bookOwner);
    } else {
      return null;
    }
  }

  decideToRenderDeleteButtonOrOwnedMsg(bookId, bookOwner) {
    if (bookOwner === this.props.userId) {
      return <h5>Owned</h5>;
    } else {
      return (
        <button onClick={() => this.handleTradeButtonClick(bookId)}>
          Trade
        </button>
      );
    }
  }

  handleTradeButtonClick(bookId) {
    this.props.setBookIdWanted(bookId);
    this.props.showSelectBookToGiveUpModal(true);
  }

  toShowSelectBookToGiveUpModal() {
    if (this.props.toShowSelectBookToGiveUpModal) {
      return <SelectBookToGiveUpModal />;
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
          {this.toShowSelectBookToGiveUpModal()}
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
                {this.decideToRenderAButton(book._id, book.bookOwner)}
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
    userId: state.userInfo.userId,
    toShowSelectBookToGiveUpModal: state.showSelectBookToGiveUpModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAUserBook: (bookId) => dispatch(deleteAUserBook(bookId)),
    showSelectBookToGiveUpModal: (bool) =>
      dispatch(showSelectBookToGiveUpModal(bool)),
    setBookIdWanted: (bookId) => dispatch(setBookIdWanted(bookId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
