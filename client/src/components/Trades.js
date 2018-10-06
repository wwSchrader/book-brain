import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTrades} from '../redux/actions/index';
import TradeItem from './TradeItem';
import './Trades.css';

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
          <div>
            <h3 className='pending-trade-header'>Get</h3>
            <h4 className='pending-trade-header'>In exchange</h4>
            <h3 className='pending-trade-header'>For</h3>
          </div>
          {this.props.pendingTradeList.map((tradeItem) => {
            return (
              <TradeItem
                  key={tradeItem._id}
                  trade={tradeItem}
                  tradeType='pending'
              />
            );
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
          <div>
            <h3 className='pending-trade-header'>For</h3>
            <h4 className='pending-trade-header'>In exchange</h4>
            <h3 className='pending-trade-header'>Get</h3>
          </div>
          {this.props.requestedTradeList.map((tradeItem) => {
            return (
              <TradeItem
                  key={tradeItem._id}
                  trade={tradeItem}
                  tradeType='requested'
              />
            );
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
