import React, {Component} from 'react';
import AddBookSearchResultsItem from './AddBookSearchResultsItem';

class AddBooksSearchResultList extends Component {
  render() {
    return (
      <div>
        <h5>Results List</h5>
        <AddBookSearchResultsItem bookTitle='Sample' bookImage='Sample Image' bookIndex={0} />
      </div>
    );
  }
}

export default AddBooksSearchResultList;
