import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getUserBookArray, proposeTrade} from '../redux/actions/index';

class SelectBookToGiveUpModal extends Component {
  constructor(props) {
    super(props);
    this.handleSelectButton = this.handleSelectButton.bind(this);
  }
  componentDidMount() {
    this.props.getUserBookArray();
  }

  handleSelectButton(bookIdToGiveUp) {
    this.props.proposeTrade(this.props.bookIdWanted, bookIdToGiveUp);
    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.onHide}>
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

const mapStateToProps = (state) => {
  return {
    bookArray: state.userBookArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserBookArray: () => dispatch(getUserBookArray()),
    proposeTrade: (bookIdWanted, bookIdToGiveUp) =>
      dispatch(proposeTrade(bookIdWanted, bookIdToGiveUp)),
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps)(SelectBookToGiveUpModal);
