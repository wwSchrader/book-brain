import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

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

  handleRegistrationButtonPress(e) {
    this.setState({registrationButtonPressed: true});
  }

  render() {
    return (
      <form autoComplete='on'>
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
        <Button onClick={this.handleRegistrationButtonPress}>Register</Button>
      </form>
    );
  }
}

export default RegistrationForm;
