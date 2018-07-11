import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {registerUserApiCall} from '../redux/actions/index';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      registrationButtonPressed: false,
    };

    this.validateField = this.validateField.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit =
      this.handleSubmit.bind(this);
  }

  validateField(field) {
    if (this.state.registrationButtonPressed) {
      if (this.state[field].length > 0) {
        return 'success';
      } else {
        return 'error';
      }
    } else {
      return null;
    }
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({registrationButtonPressed: true});
    if (this.state.username.length > 0 && this.state.password.length > 0 && this.state.email.length > 0) {
      this.props.registerUserApiCall({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      });
    }
  }

  render() {
    return (
      <form autoComplete='on' onSubmit={this.handleSubmit}>
        <FormGroup
            controlId='emailField'
            validationState={this.validateField('email')}
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
              type='email'
              value={this.state.email}
              placeholder='Enter Email'
              onChange={this.handleEmailChange}
              autoComplete='email'
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
            controlId='usernameField'
            validationState={this.validateField('username')}
        >
          <ControlLabel>Username</ControlLabel>
          <FormControl
              type='text'
              value={this.state.username}
              placeholder='Enter Username'
              onChange={this.handleUsernameChange}
              autoComplete='username'
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
            controlId='passwordId'
            validationState={this.validateField('password')}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
              type='password'
              value={this.state.password}
              placeholder='Enter password'
              onChange={this.handlePasswordChange}
              autoComplete='new-password'
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button type='submit' >
          Register
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUserApiCall: (bool) => dispatch(registerUserApiCall(bool)),
  };
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
