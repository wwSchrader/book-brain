import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addBookModalIsOpen} from '../redux/actions/index';
import AddBookModal from './AddBookModal';
import {Redirect} from 'react-router-dom';

class MyBooks extends Component {
  constructor(props) {
    super(props);
    this.handleAddBookClick = this.handleAddBookClick.bind(this);
  }

  handleAddBookClick() {
    this.props.addBookModalIsOpen(true);
  }

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          <h3>My Books Screen</h3>
          <button onClick={this.handleAddBookClick}>Add a Book</button>
          <AddBookModal/>
        </div>
      );
    } else {
      return (
        <Redirect to='/'/>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userIsLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBookModalIsOpen: (isOpen) => dispatch(addBookModalIsOpen(isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
