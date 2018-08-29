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
  userBookArray,
  allUsersBookArray,
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
  userBookArray,
  allUsersBookArray,
});

export default bookBrainApp;
