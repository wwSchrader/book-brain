import React, {Component} from 'react';

class TradeItems extends Component {
  constructor(props) {
    super(props);

    this.showButton = this.showButton.bind(this);
  }

  showButton() {
    if (this.props.tradeType === 'requested') {
      return (
        <div style={{'display': 'inline-block'}}>
          <button>Accept</button>
          <button>Reject</button>
        </div>
      );
    } else if (this.props.tradeType === 'pending') {
      return <button>Cancel</button>;
    }
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

export default TradeItems;
