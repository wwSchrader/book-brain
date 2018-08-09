import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loginModalIsOpen, logoutUserApiCall} from '../redux/actions/index';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.onShowLoginModal = this.onShowLoginModal.bind(this);
    this.showLoginOrLogout = this.showLoginOrLogout.bind(this);
  }

  onShowLoginModal() {
    this.props.loginModalIsOpen(true);
  }

  showLoginOrLogout() {
    if (this.props.isLoggedIn) {
      return (
        <NavItem eventKey={1} onClick={this.props.logoutUserApiCall}>
          Logout
        </NavItem>
      );
    } else {
      return (
        <NavItem eventKey={1} onClick={this.onShowLoginModal}>
          Login
        </NavItem>
      );
    }
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Book Brain
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          {this.showLoginOrLogout()}
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userIsLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginModalIsOpen: (bool) => dispatch(loginModalIsOpen(bool)),
    logoutUserApiCall: (bool) => dispatch(logoutUserApiCall(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
