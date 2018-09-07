import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTrades} from '../redux/actions/index';

class Trades extends Component {
  componentDidMount() {
    this.props.getTrades();
  }

  render() {
    return (
      <div>
        <h2>Requested Trades</h2>
      </div>
    );
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getTrades: () => dispatch(getTrades()),
  };
};

export default connect(null, mapDispatchToProps)(Trades);
