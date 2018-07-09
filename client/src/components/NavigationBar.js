import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loginModalIsOpen} from '../redux/actions/index';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.onShowLoginModal = this.onShowLoginModal.bind(this);
  }

  onShowLoginModal() {
    this.props.loginModalIsOpen(true);
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
          <NavItem eventKey={1} onClick={this.onShowLoginModal}>
            Login
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginModalIsOpen: (bool) => dispatch(loginModalIsOpen(bool)),
  };
};

export default connect(null, mapDispatchToProps)(NavigationBar);
