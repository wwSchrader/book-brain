import {combineReducers} from 'redux';
import {
  userIsLoggedIn,
  userIsLoading,
  userLoginFailed,
  userNameFetch,
  loginModalIsOpen,
  userLoginMessageFailure,
  userInfo,
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
  userInfo,
});

export default bookBrainApp;
