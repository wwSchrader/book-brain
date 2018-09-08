import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTrades} from '../redux/actions/index';
import TradeItem from './TradeItem';

class Trades extends Component {
  constructor(props) {
    super(props);
    this.showPendingTrades = this.showPendingTrades.bind(this);
    this.showRequestedTrades = this.showRequestedTrades.bind(this);
  }
  componentDidMount() {
    this.props.getTrades();
  }

  showPendingTrades() {
    if (this.props.pendingTradeList.length === 0) {
      return <h4>No pending Trades</h4>;
    } else {
      return (
        <div>
          {this.props.pendingTradeList.map((book) => {
            return <TradeItem book={book} tradeType='pending' />;
          })}
        </div>
      );
    }
  }

  showRequestedTrades() {
    if (this.props.requestedTradeList.length === 0) {
      return <h4>No requested Trades</h4>;
    } else {
      return (
        <div>
          {this.props.requestedTradeList.map((book) => {
            return <TradeItem book={book} tradeType='requested' />;
          })}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Pending Trades</h2>
        {this.showPendingTrades()}
        <h2>Requested Trades</h2>
        {this.showRequestedTrades()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    pendingTradeList: state.pendingTradeList,
    requestedTradeList: state.requestedTradeList,
  };
};

const mapDispatchToProps =(dispatch) => {
  return {
    getTrades: () => dispatch(getTrades()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trades);
