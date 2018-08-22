import React, {Component} from 'react';
import AddBookSearchResultsItem from './AddBookSearchResultsItem';
import {connect} from 'react-redux';

class AddBooksSearchResultList extends Component {
  render() {
    return (
      <div>
        <h5>Results List</h5>
        {this.props.bookSearchArray &&
          this.props.bookSearchArray.map((searchResult, index) => {
            return (
              <AddBookSearchResultsItem
                  key={searchResult.bookInfoUrl}
                  bookTitle={searchResult.bookTitle}
                  bookImage={searchResult.bookThumbnailUrl}
                  bookIndex={index}
              />
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookSearchArray: state.bookSearchArray,
  };
};

export default connect(mapStateToProps, null)(AddBooksSearchResultList);
