import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllUserBookArray} from '../redux/actions/index';
import BookList from './BookList';

class Home extends Component {
  componentDidMount() {
    this.props.getAllUsersBooksArray();
  }

  render() {
    return (
      <div>
        <h3>Welcome to Book Brain!</h3>
        <BookList bookArray={this.props.bookArray} parentComponent={'Home'} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookArray: state.allUsersBookArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsersBooksArray: () => dispatch(getAllUserBookArray()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
