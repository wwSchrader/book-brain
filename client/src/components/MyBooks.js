import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addBookModalIsOpen, getUserBookArray} from '../redux/actions/index';
import AddBookModal from './AddBookModal';
import {Redirect} from 'react-router-dom';
import BookList from './BookList';

class MyBooks extends Component {
  constructor(props) {
    super(props);
    this.handleAddBookClick = this.handleAddBookClick.bind(this);
  }

  componentDidMount() {
    this.props.getUserBookArray();
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
          <BookList bookArray={this.props.bookArray} />
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
    bookArray: state.userBookArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBookModalIsOpen: (isOpen) => dispatch(addBookModalIsOpen(isOpen)),
    getUserBookArray: () => dispatch(getUserBookArray()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
