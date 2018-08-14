import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loginModalIsOpen, logoutUserApiCall} from '../redux/actions/index';
import {LinkContainer} from 'react-router-bootstrap';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.onShowLoginModal = this.onShowLoginModal.bind(this);
    this.showLoginOrLogout = this.showLoginOrLogout.bind(this);
    this.showUserNavigationButtons = this.showUserNavigationButtons.bind(this);
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

  showUserNavigationButtons() {
    if (this.props.isLoggedIn) {
      return (
          <LinkContainer to='/mybooks'>
            <NavItem eventKey={'mybooks'}>My Books</NavItem>
          </LinkContainer>

      );
    }
  }

  render() {
    return (
      <Navbar>
        <LinkContainer to='/'>
          <Navbar.Header>
            <Navbar.Brand>
              Book Brain
            </Navbar.Brand>
          </Navbar.Header>
        </LinkContainer>
        <Nav>
          {this.showUserNavigationButtons()}
        </Nav>
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
