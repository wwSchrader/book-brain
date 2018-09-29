import React, {Component} from 'react';
import {connect} from 'react-redux';
import {showSelectBookToGiveUpModal} from '../redux/actions/index';
import SelectBookToGiveUpModal from './SelectBookToGiveUpModal';
import Masonry from 'react-masonry-component';
import BookItem from './BookItem';

class BookList extends Component {
  toShowSelectBookToGiveUpModal() {
    if (this.props.toShowSelectBookToGiveUpModal) {
      return <SelectBookToGiveUpModal />;
    } else {
      return null;
    }
  }

  render() {
    if (this.props.bookArray.length === 0) {
      return <h3>No Books!</h3>;
    } else {
      return (
        <div>
          {this.toShowSelectBookToGiveUpModal()}
          <Masonry>
            {this.props.bookArray.map((book) => {
              return (
                <BookItem
                    key={book._id}
                    book={book}
                    parentComponent={this.props.parentComponent}
                />
              );
            })}
          </Masonry>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    toShowSelectBookToGiveUpModal: state.showSelectBookToGiveUpModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSelectBookToGiveUpModal: (bool) =>
      dispatch(showSelectBookToGiveUpModal(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
