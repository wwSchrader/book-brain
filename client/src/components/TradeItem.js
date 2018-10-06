import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteTrade, acceptTrade} from '../redux/actions/index';
import './TradeItem.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button} from 'react-bootstrap';

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
        <div>
          <Button
              className='trade-button'
              bsStyle="success"
              onClick={this.handleAcceptButton}
          >Accept</Button>
          <Button
              className='trade-button'
              bsStyle="danger"
              onClick={this.handleDeleteOrCancelButton}
          >Reject</Button>
        </div>
      );
    } else if (this.props.tradeType === 'pending') {
      return (
        <Button
            className='trade-button'
            bsStyle="danger"
            onClick={this.handleDeleteOrCancelButton}
        >Cancel</Button>
      );
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
        <img
            className='trade-thumbnail'
            src={this.props.trade.solicitorBook.bookThumbnailUrl}
            alt={'Book cover of ' + this.props.trade.solicitorBook.bookTitle}
        />
        <div className='trade-indicator'>
          <FontAwesomeIcon
              className='trade-icon'
              icon='exchange-alt'
              size='5x'
          />
          {this.showButton()}
        </div>
        <img
            className='trade-thumbnail'
            src={this.props.trade.bookToTrade.bookThumbnailUrl}
            alt={'Book cover of ' + this.props.trade.bookToTrade.bookTitle}
        />
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
