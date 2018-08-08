import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addBookModalIsOpen} from '../redux/actions/index';
import AddBookSearchBar from './AddBookSearchBar';

class AddBookModal extends Component {
  constructor(props) {
    super(props);
    this.onHideModal = this.onHideModal.bind(this);
  }

  onHideModal() {
    this.props.addBookModalIsOpen(false);
  }

  render() {
    return (
      <Modal show={this.props.showAddBookModal} onHide={this.onHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add A Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddBookSearchBar/>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showAddBookModal: state.addBookModalIsOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBookModalIsOpen: (isOpen) => dispatch(addBookModalIsOpen(isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);
