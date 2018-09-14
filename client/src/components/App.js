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
    console.log("Check session called!");
    this.props.checkForExistingUserSession();
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
