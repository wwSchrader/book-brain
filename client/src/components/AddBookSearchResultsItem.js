import React, {Component} from 'react';

class AddBookSearchResultItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookTitle: props.bookTitle,
      bookImage: props.bookImage,
      bookIndex: props.bookIndex,
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.state.bookImage !== newProps.bookImage) {
      this.setState({
        bookTitle: newProps.bookTitle,
        bookImage: newProps.bookImage,
        bookIndex: newProps.bookIndex,
      });
    }
  }

  render() {
    return (
      <div>
        <h5>{this.state.bookTitle}</h5>
        <p>{this.state.bookImage}</p>
        <p>{this.state.bookIndex}</p>
      </div>
    );
  }
}

export default AddBookSearchResultItem;
