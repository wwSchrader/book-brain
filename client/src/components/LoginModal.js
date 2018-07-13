import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loginModalIsOpen} from '../redux/actions/index';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationMode: false,
    };

    this.onHideLoginModal = this.onHideLoginModal.bind(this);
    this.switchRegistrationMode = this.switchRegistrationMode.bind(this);
    this.displayLoginOrRegistrationForm =
      this.displayLoginOrRegistrationForm.bind(this);
  }

  onHideLoginModal() {
    this.props.loginModalIsOpen(false);
  }

  switchRegistrationMode() {
    this.setState({registrationMode: !this.state.registrationMode});
  }

  displayLoginOrRegistrationForm() {
    if (this.state.registrationMode) {
      return (
        <div>
          <RegistrationForm />
          <h4>Already have an account?</h4>
          <Button onClick={this.switchRegistrationMode}>Login</Button>
        </div>
      );
    } else {
      return (
        <div>
          <LoginForm />
          <h4>New to this site?</h4>
          <Button onClick={this.switchRegistrationMode}>Register</Button>
        </div>
      );
    }
  }

  render() {
    return (
      <Modal show={this.props.showLoginModal} onHide={this.onHideLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.displayLoginOrRegistrationForm()}
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
