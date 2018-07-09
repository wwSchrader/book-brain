import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      passwprd: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({passowrd: e.target.value});
  }

  render() {
    return (
      <form>
        <FormGroup controlId='usernameField'>
          <ControlLabel>Username:</ControlLabel>
          <FormControl
              type='text'
              value={this.state.username}
              placeholder='Enter Username'
              onChange={this.handleUsernameChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId='passwordField'>
          <ControlLabel>Password:</ControlLabel>
          <FormControl
              type='password'
              value={this.state.password}
              placeholder='Enter password'
              onChange={this.handlePasswordChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}

export default LoginForm;
