import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import NavigationBar from './NavigationBar';
import LoginModal from './LoginModal';
import {connect} from 'react-redux';
import {addBookModalIsOpen} from '../redux/actions/index';
import AddBookModal from './AddBookModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAddBookClick = this.handleAddBookClick.bind(this);
  }

  handleAddBookClick() {
    this.props.addBookModalIsOpen(true);
  }

  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <LoginModal/>
        <AddBookModal/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.handleAddBookClick}>Add a Book</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBookModalIsOpen: (isOpen) => dispatch(addBookModalIsOpen(isOpen)),
  };
};

export default connect(null, mapDispatchToProps)(App);
