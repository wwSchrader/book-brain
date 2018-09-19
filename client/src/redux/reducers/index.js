import {combineReducers} from 'redux';
import {
  userIsLoggedIn,
  userIsLoading,
  userLoginFailed,
  userNameFetch,
  loginModalIsOpen,
  userLoginMessageFailure,
  userInfo,
  showUserRegisteredAlert,
} from './user.js';
import {
  addBookModalIsOpen,
  bookSearchArray,
  userBookArray,
  allUsersBookArray,
  showSelectBookToGiveUpModal,
  bookIdWanted,
} from './book.js';
import {
  requestedTradeList,
  pendingTradeList,
} from './trade.js';

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
  requestedTradeList,
  pendingTradeList,
  showUserRegisteredAlert,
  showSelectBookToGiveUpModal,
  bookIdWanted,
});

export default bookBrainApp;
