import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import {loginUserApiCall} from '../redux/actions/index';
import {connect} from 'react-redux';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitButtonPressed: false,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validateField = this.validateField.bind(this);
    this.handleLoginButtonPress = this.handleLoginButtonPress.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  validateField(field) {
    if (this.state.submitButtonPressed) {
      if (this.state[field].length < 1) {
        return 'error';
      } else {
        return 'success';
      }
    } else {
      return null;
    }
  }

  handleLoginButtonPress(e) {
    this.setState({submitButtonPressed: true});
    console.log("Username: " + this.state.username.length);
    console.log("Password: " + this.state.password);
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      console.log("Login button pressed");
      this.props.loginUserApiCall({
        username: this.state.username,
        password: this.state.password,
      });
    }
  }

  render() {
    return (
      <form autoComplete='on'>
        <FormGroup
            controlId='usernameField'
            validationState={this.validateField('username')}
        >
          <ControlLabel>Username:</ControlLabel>
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
            controlId='passwordField'
            validationState={this.validateField('password')}
        >
          <ControlLabel>Password:</ControlLabel>
          <FormControl
              type='password'
              value={this.state.password}
              placeholder='Enter password'
              onChange={this.handlePasswordChange}
              autoComplete='current-password'
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button onClick={this.handleLoginButtonPress}>Login</Button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUserApiCall: (user) => dispatch(loginUserApiCall(user)),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
