import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getUserBookArray} from '../redux/actions/index';

class SelectBookToGiveUpModal extends Component {
  componentDidMount() {
    this.props.getUserBookArray();
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
                <button>Select</button>
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
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps)(SelectBookToGiveUpModal);
