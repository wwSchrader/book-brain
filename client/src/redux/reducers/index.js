import {combineReducers} from 'redux';
import {
  userIsLoggedIn,
  userIsLoading,
  userLoginFailed,
  userNameFetch,
  loginModalIsOpen,
  userLoginMessageFailure,
} from './user.js';
import {
  addBookModalIsOpen,
  bookSearchArray,
} from './book.js';

const bookBrainApp = combineReducers({
  userIsLoggedIn,
  userIsLoading,
  userLoginFailed,
  userNameFetch,
  loginModalIsOpen,
  userLoginMessageFailure,
  addBookModalIsOpen,
  bookSearchArray,
});

export default bookBrainApp;
