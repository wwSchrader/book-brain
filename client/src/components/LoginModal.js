import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loginModalIsOpen} from '../redux/actions/index';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.onHideLoginModal = this.onHideLoginModal.bind(this);
  }

  onHideLoginModal() {
    this.props.loginModalIsOpen(false);
  }

  render() {
    return (
      <Modal show={this.props.showLoginModal} onHide={this.onHideLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Please sign in</h3>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showLoginModal: state.loginModalIsOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginModalIsOpen: (bool) => dispatch(loginModalIsOpen(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
