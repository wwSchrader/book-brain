import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loginModalIsOpen, logoutUserApiCall} from '../redux/actions/index';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {withRouter} from 'react-router-dom';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.onShowLoginModal = this.onShowLoginModal.bind(this);
    this.showLoginOrLogout = this.showLoginOrLogout.bind(this);
    this.showUserNavigationButtons = this.showUserNavigationButtons.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  onShowLoginModal() {
    this.props.loginModalIsOpen(true);
  }

  logoutUser() {
    this.props.logoutUserApiCall()
    .then((resp) => {
      if (resp) {
        this.props.history.push('/');
      } else {
        console.log('Logout Failed');
      }
    });
  }

  showLoginOrLogout() {
    if (this.props.isLoggedIn) {
      return (
        <NavItem onClick={this.logoutUser}>
          Logout
        </NavItem>
      );
    } else {
      return (
        <NavItem onClick={this.onShowLoginModal}>
          Login
        </NavItem>
      );
    }
  }

  showUserNavigationButtons() {
    if (this.props.isLoggedIn) {
      return (
        <Nav>
          <IndexLinkContainer to={'/'}>
            <NavItem>Home</NavItem>
          </IndexLinkContainer>
          <LinkContainer to={'/mybooks'}>
            <NavItem>My Books</NavItem>
          </LinkContainer>
          <LinkContainer to={'/trades'}>
            <NavItem>Trades</NavItem>
          </LinkContainer>
        </Nav>
      );
    }
  }

  render() {
    return (
      <Navbar>
        <IndexLinkContainer to={'/'}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href={''}>Book Brain</a>
            </Navbar.Brand>
          </Navbar.Header>
        </IndexLinkContainer>
        {this.showUserNavigationButtons()}
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
    logoutUserApiCall: () => dispatch(logoutUserApiCall()),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {pure: false},
  )(NavigationBar));
