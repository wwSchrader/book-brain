import React, {Component} from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import LoginModal from './LoginModal';

import MyBooks from './MyBooks';
import {Route, withRouter} from 'react-router-dom';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <LoginModal/>
        <Route exact path='/' component={Home} />
        <Route path='/mybooks' component={MyBooks} />
      </div>
    );
  }
}

export default App;
