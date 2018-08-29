import React, {Component} from 'react';

class BookList extends Component {
  handleInfoButtonClick(bookInfoUrl) {
    let win = window.open(bookInfoUrl, '_blank');
    win.focus();
  }

  render() {
    if (!this.props.bookArray) {
      return <h3>No Books!</h3>;
    } else {
      return (
        <div>
          {this.props.bookArray.map((book) => {
            return (
              <div key={book.bookOwner + book.bookInfoUrl}>
                <h3>{book.bookTitle}</h3>
                <img
                    src={book.bookThumbnailUrl}
                    alt={'Book cover of ' + book.bookTitle}
                />
                <button
                    onClick={() => this.handleInfoButtonClick(book.bookInfoUrl)}
                >Book Info</button>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default BookList;
