import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
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

  render() {
    if (this.props.bookArray.length === 0) {
      return (
        <Modal show onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Choose Book To Give Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>You need to add a book to your collection first.</h2>
            <h3>Go to My Books to add a book.</h3>
          </Modal.Body>
        </Modal>
      );
    } else {
      return (
        <Modal show onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Choose Book To Give Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.bookArray.map((book) => {
              return (
                <div key={book._id}>
                  <h3>{book.bookTitle}</h3>
                  <img
                      src={book.bookThumbnailUrl}
                      alt={'Book cover of ' + book.bookTitle}
                  />
                  <button onClick={() => this.handleSelectButton(book._id)}>
                    Select
                  </button>
                </div>
              );
            })}
          </Modal.Body>
        </Modal>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    bookArray: state.userBookArray,
    bookIdWanted: state.bookIdWanted,
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
