import {combineReducers} from 'redux';
import {
  userIsLoggedIn,
  userIsLoading,
  userLoginFailed,
  userNameFetch,
} from './user.js';

const bookBrainApp = combineReducers({
  userIsLoggedIn,
  userIsLoading,
  userLoginFailed,
  userNameFetch,
});

export default bookBrainApp;
