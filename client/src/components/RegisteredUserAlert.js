import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import {connect} from 'react-redux';

class RegisteredUserAlert extends Component {
  render() {
    if (this.props.showUserRegisteredAlert) {
      return (
        <Alert bsStyle='success'>
          <strong>Contrats!</strong> You have successfully registered.
          Now try logging in.
        </Alert>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    showUserRegisteredAlert: state.showUserRegisteredAlert,
  };
};

export default connect(mapStateToProps, null)(RegisteredUserAlert);
