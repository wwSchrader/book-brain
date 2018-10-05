import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteTrade, acceptTrade} from '../redux/actions/index';
import './TradeItem.css';

class TradeItems extends Component {
  constructor(props) {
    super(props);

    this.showButton = this.showButton.bind(this);
    this.handleDeleteOrCancelButton =
      this.handleDeleteOrCancelButton.bind(this);
    this.handleAcceptButton = this.handleAcceptButton.bind(this);
  }

  showButton() {
    if (this.props.tradeType === 'requested') {
      return (
        <div style={{'display': 'inline-block'}}>
          <button onClick={this.handleAcceptButton}>Accept</button>
          <button onClick={this.handleDeleteOrCancelButton}>Reject</button>
        </div>
      );
    } else if (this.props.tradeType === 'pending') {
      return <button onClick={this.handleDeleteOrCancelButton}>Cancel</button>;
    }
  }

  handleDeleteOrCancelButton() {
    this.props.deleteTrade(this.props.trade._id);
  }

  handleAcceptButton() {
    this.props.acceptTrade(this.props.trade._id);
  }

  render() {
    return (
      <div className='trade-parent'>
        <div className='trade-thumbnail'>
          <h3>{this.props.trade.solicitorBook.bookTitle}</h3>
          <img
              src={this.props.trade.solicitorBook.bookThumbnailUrl}
              alt={'Book cover of ' + this.props.trade.solicitorBook.bookTitle}
          />
        </div>
        <h2 className='trade-indicator'>For</h2>
        <div className='trade-thumbnail'>
          <h3>{this.props.trade.bookToTrade.bookTitle}</h3>
          <img
              src={this.props.trade.bookToTrade.bookThumbnailUrl}
              alt={'Book cover of ' + this.props.trade.bookToTrade.bookTitle}
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
    acceptTrade: (tradeId) => dispatch(acceptTrade(tradeId)),
  };
};

export default connect(null, mapDispatchToProps)(TradeItems);
