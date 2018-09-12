import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteTrade} from '../redux/actions/index';

class TradeItems extends Component {
  constructor(props) {
    super(props);

    this.showButton = this.showButton.bind(this);
    this.handleDeleteOrCancelButton =
      this.handleDeleteOrCancelButton.bind(this);
  }

  showButton() {
    if (this.props.tradeType === 'requested') {
      return (
        <div style={{'display': 'inline-block'}}>
          <button>Accept</button>
          <button onClick={this.handleDeleteOrCancelButton}>Reject</button>
        </div>
      );
    } else if (this.props.tradeType === 'pending') {
      return <button onClick={this.handleDeleteOrCancelButton}>Cancel</button>;
    }
  }

  handleDeleteOrCancelButton() {
    this.props.deleteTrade(this.props.book._id);
  }

  render() {
    return (
      <div style={{'text-align': 'center', 'border-style': 'solid'}}>
        <div style={{'display': 'inline-block', 'border-style': 'solid'}}>
          <h3>{this.props.book.solicitorBook.bookTitle}</h3>
          <img
              src={this.props.book.solicitorBook.bookThumbnailUrl}
              alt={'Book cover of ' + this.props.book.solicitorBook.bookTitle}
          />
        </div>
        <h2 style={{'display': 'inline-block'}}>For</h2>
        <div style={{'display': 'inline-block', 'border-style': 'solid'}}>
          <h3>{this.props.book.bookToTrade.bookTitle}</h3>
          <img
              src={this.props.book.bookToTrade.bookThumbnailUrl}
              alt={'Book cover of ' + this.props.book.bookToTrade.bookTitle}
          />
        </div>
        {this.showButton()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTrade: (tradeId) => dispatch(deleteTrade(tradeId)),
  };
};

export default connect(null, mapDispatchToProps)(TradeItems);
