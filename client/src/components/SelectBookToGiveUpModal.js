import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

class SelectBookToGiveUpModal extends Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Book To Give Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>BookId: {this.props.bookIdWanted}</p>
        </Modal.Body>
      </Modal>
    );
  }
}

export default SelectBookToGiveUpModal;
