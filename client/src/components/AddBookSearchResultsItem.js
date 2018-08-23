import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addBookToUserCollection} from '../redux/actions/index';

class AddBookSearchResultItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookTitle: props.bookTitle,
      bookImage: props.bookImage,
      bookIndex: props.bookIndex,
    };

    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
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

  handleAddButtonClick() {
    this.props.addBookToUserCollection(this.props.bookIndex);
  }

  render() {
    return (
      <div>
        <h5>{this.state.bookTitle}</h5>
        <img
            src={this.state.bookImage}
            alt={'Picture of ' + this.state.bookTitle}
        />
        <button onClick={this.handleAddButtonClick}>Add</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBookToUserCollection:
      (index) => dispatch(addBookToUserCollection(index)),
  };
};

export default connect(null, mapDispatchToProps)(AddBookSearchResultItem);
