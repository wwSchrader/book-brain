import React, {Component} from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import LoginModal from './LoginModal';
import MyBooks from './MyBooks';
import {Route, withRouter} from 'react-router-dom';
import Home from './Home';
import Trades from './Trades';
import RegisteredUserAlert from './RegisteredUserAlert';
import {connect} from 'react-redux';
import {
  checkForExistingUserSession,
  facebookAuthenticate,
  getTrades,
} from '../redux/actions/index';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faExchangeAlt,
  faCheckCircle,
  faBan,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import Loading from './Loading';

library.add(faExchangeAlt, faCheckCircle, faBan, faClock);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {showSpinner: true};
  }

  componentDidMount() {
    // Initialize FB SDK for Login Button
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v3.1',
      });

      window.FB.Event.subscribe('auth.login', (response) => {
        this.props.facebookAuthenticate(response.authResponse.accessToken);
      });
    }.bind(this);

    (function(d, s, id) {
      let js = d.getElementsByTagName(s)[0];
      let fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    this.props.checkForExistingUserSession()
    .then((isLoggedIn) => {
      if (!isLoggedIn) {
        this.props.history.push('/');
      } else {
        this.props.getTrades();
      }

      this.setState({showSpinner: false});
    });
  }

  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <RegisteredUserAlert/>
        <LoginModal/>
        <Loading loading={this.state.showSpinner} />
        <Route exact path='/' component={Home} />
        <Route path='/mybooks' component={MyBooks} />
        <Route path='/trades' component={Trades} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkForExistingUserSession: () => dispatch(checkForExistingUserSession()),
    facebookAuthenticate:
      (facebookToken) => dispatch(facebookAuthenticate(facebookToken)),
    getTrades: () => dispatch(getTrades()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
