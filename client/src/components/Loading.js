import React, {Component} from 'react';
import {RingLoader} from 'react-spinners';
import './Loading.css';

class Loading extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className='loader-container'>
          <h3>
            Please wait while the server is spinning up.
          </h3>
          <h4>
            Could take about 20 seconds.
          </h4>
          <RingLoader
              className={'spinning'}
              loading={this.props.showSpinner}
              color={'#F5A623'}
              size={150}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Loading;
