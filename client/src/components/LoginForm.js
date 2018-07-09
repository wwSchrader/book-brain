import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
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
      </form>
    );
  }
}

export default LoginForm;
