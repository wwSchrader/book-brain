import React, {Component} from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import LoginModal from './LoginModal';
import MyBooks from './MyBooks';
import {Route} from 'react-router-dom';
import Home from './Home';
import Trades from './Trades';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <LoginModal/>
        <Route exact path='/' component={Home} />
        <Route path='/mybooks' component={MyBooks} />
        <Route path='/trades' component={Trades} />
      </div>
    );
  }
}

export default App;
