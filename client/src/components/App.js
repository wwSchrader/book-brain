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
import {checkForExistingUserSession} from '../redux/actions/index';

class App extends Component {
  componentDidMount() {
    // Initialize FB SDK for Login Button
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '525631557907551',
        cookie: true,
        xfbml: true,
        version: 'v3.1',
      });
    };

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
      }
    });
  }

  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <RegisteredUserAlert/>
        <LoginModal/>
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
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
