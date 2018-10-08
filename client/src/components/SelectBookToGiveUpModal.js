import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {
  getUserBookArray,
  proposeTrade,
  showSelectBookToGiveUpModal,
  setBookIdWanted,
} from '../redux/actions/index';
import {withRouter} from 'react-router-dom';

class SelectBookToGiveUpModal extends Component {
  constructor(props) {
    super(props);
    this.handleSelectButton = this.handleSelectButton.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.toDisableButton = this.toDisableButton.bind(this);
  }

  componentDidMount() {
    this.props.getUserBookArray();
  }

  handleSelectButton(bookIdToGiveUp) {
    this.props.proposeTrade(this.props.bookIdWanted, bookIdToGiveUp)
    .then((didComplete) => {
      this.hideModal();
      this.props.history.push('/trades');
    });
  }

  hideModal() {
    this.props.showSelectBookToGiveUpModal(false);
    this.props.setBookIdWanted(null);
  }

  toDisableButton(bookId) {
    if (this.props.pendingTrades.find(
        (trade) => trade.bookToTrade._id === bookId)) {
      return true;
    } else {
      return false;
    }
  }

  displayModalBody() {
    if (this.props.bookArray.length === 0) {
      return (
        <Modal.Body>
          <h2>You need to add a book to your collection first.</h2>
          <h3>Go to My Books to add a book.</h3>
        </Modal.Body>
      );
    } else {
      return (
        <Modal.Body>
          {this.props.bookArray.map((book) => {
            return (
              <div key={book._id}>
                <h3>{book.bookTitle}</h3>
                <img
                    src={book.bookThumbnailUrl}
                    alt={'Book cover of ' + book.bookTitle}
                />
                <Button
                    onClick={() => this.handleSelectButton(book._id)}
                    disabled={this.toDisableButton(book._id)}
                >
                  Select
                </Button>
              </div>
            );
          })}
        </Modal.Body>
      );
    }
  }

  render() {
    return (
      <Modal show onHide={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Book To Give Up</Modal.Title>
        </Modal.Header>
        {this.displayModalBody()}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookArray: state.userBookArray,
    bookIdWanted: state.bookIdWanted,
    pendingTrades: state.pendingTradeList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserBookArray: () => dispatch(getUserBookArray()),
    proposeTrade: (bookIdWanted, bookIdToGiveUp) =>
      dispatch(proposeTrade(bookIdWanted, bookIdToGiveUp)),
    showSelectBookToGiveUpModal: (bool) =>
      dispatch(showSelectBookToGiveUpModal(bool)),
    setBookIdWanted: (bookId) => dispatch(setBookIdWanted(bookId)),
  };
};

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps)(SelectBookToGiveUpModal));
