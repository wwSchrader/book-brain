const USER_IS_LOGGED_IN = 'USER_IS_LOGGED_IN';
const USER_IS_LOADING = 'USER_IS_LOADING';
const USERNAME_FETCH_SUCCESSFUL = 'USERNAME_FETCH_SUCCESSFUL';
const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
const LOGIN_MODAL_IS_OPEN = 'LOGIN_MODAL_IS_OPEN';
const USER_LOGIN_FAILURE_MESSAGE = 'USER_LOGIN_FAILURE_MESSAGE';
const ADD_BOOK_MODAL_IS_OPEN = 'ADD_BOOK_MODAL_IS_OPEN';
const BOOK_SEARCH_ARRAY = 'BOOK_SEARCH_ARRAY';
const USER_BOOK_ARRAY = 'USER_BOOK_ARRAY';
const ALL_USERS_BOOK_ARRAY = 'ALL_USERS_BOOK_ARRAY';
const USER_INFO = 'USER_INFO';
const REQUESTED_TRADE_LIST = 'REQUESTED_TRADE_LIST';
const PENDING_TRADE_LIST = 'PENDING_TRADE_LIST';
const SHOW_USER_REGISTERED_ALERT = 'SHOW_USER_REGISTERED_ALERT';
const SHOW_SELECT_BOOK_TO_GIVE_UP_MODAL = 'SHOW_SELECT_BOOK_TO_GIVE_UP_MODAL';
const BOOK_ID_WANTED = 'BOOK_ID_WANTED';

export function isLoggedIn(bool) {
  return {
    type: USER_IS_LOGGED_IN,
    isLoggedIn: bool,
  };
}

export function userIsLoading(bool) {
  return {
    type: USER_IS_LOADING,
    userIsLoading: bool,
  };
}

export function userLoginFailed(bool) {
  return {
    type: USER_LOGIN_FAILED,
    userLoginFailed: bool,
  };
}

export function userLoginFailedMessage(message) {
  return {
    type: USER_LOGIN_FAILURE_MESSAGE,
    userLoginFailureMessage: message,
  };
}

export function usernameFetchSuccessful(items) {
  return {
    type: USERNAME_FETCH_SUCCESSFUL,
    username: items,
  };
}

export function loginModalIsOpen(bool) {
  return {
    type: LOGIN_MODAL_IS_OPEN,
    loginModal: bool,
  };
}

export function registerUserApiCall(user) {
  return (dispatch) => {
    // show loading screen while calling registration api
    dispatch(userIsLoading(true));
    console.log(user);

    fetch('/api/users/register/local', {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'},
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log('Registration');
        console.log(res);
        if (res.REGISTERED === 'COMPLETE') {
          // if registered, close modal, set as logged in
          // and cancel loading state
          dispatch(userIsLoading(false));
          dispatch(loginModalIsOpen(false));
          dispatch(showUserRegisteredAlert(true));
        }
      })
      .catch((err) => {
        dispatch(userIsLoading(false));
        console.log('Error registering user: ' + err);
      });
  };
}

export function showUserRegisteredAlert(bool) {
  return {
    type: SHOW_USER_REGISTERED_ALERT,
    showUserRegisteredAlert: bool,
  };
}

export function loginUserApiCall(user) {
  return (dispatch) => {
    // show loading while calling login api
    dispatch(userIsLoading(true));

    fetch('/api/users/login/local', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'},
    })
    .then((resp) => resp.json())
    .then((res) => {
      if (res.isLoggedIn) {
        dispatch(userIsLoading(false));
        dispatch(isLoggedIn(true));
        dispatch(userLoginFailed(false));
        dispatch(loginModalIsOpen(false));
        dispatch(setUserInfo(res.userId));
        dispatch(showUserRegisteredAlert(false));
      } else if (!res.isLoggedIn) {
        dispatch(userIsLoading(false));
        dispatch(userLoginFailed(true));
        dispatch(userLoginFailedMessage(res.authError));
      }
    })
    .catch((err) => {
      dispatch(userIsLoading(false));
      console.log('Error logging in user: ' + err);
    });
  };
}

export function logoutUserApiCall() {
  return (dispatch) => {
    fetch('api/users/logout', {
      method: 'GET',
      credentials: 'include'
    })
    .then((resp) => resp.json())
    .then((res) => {
      if (!res.isLoggedIn) {
        dispatch(isLoggedIn(false));
        dispatch(setUserInfo(null));
      }
    })
   .catch((err) => {
      console.log('Error with logging out: ' + err);
    });
  };
}

export function addBookModalIsOpen(bool) {
  return {
    type: ADD_BOOK_MODAL_IS_OPEN,
    addBookModalIsOpen: bool,
  };
}

export function bookSearchArray(bookArray) {
  return {
    type: BOOK_SEARCH_ARRAY,
    bookSearchArray: bookArray,
  };
}

export function getBookSearchArray(bookSearchTerm) {
  return (dispatch) => {
    fetch('api/books/getbook/' + bookSearchTerm, {
      method: 'GET',
      credentials: 'include',
    })
    .then((resp) => resp.json())
    .then((res) => {
      dispatch(bookSearchArray(res));
    })
    .catch((err) => {
      console.log('Error with getting Book Search Array' + err);
    });
  };
}

export function addBookToUserCollection(bookSearchIndex) {
  return (dispatch) => {
    fetch('api/books/addbook', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body:
          JSON.stringify({selectedBookIndex: bookSearchIndex}),
    })
    .then((resp) => resp.json())
    .then((res) => {
      if (res.bookIsAdded) {
        // close modal if book is added
        dispatch(addBookModalIsOpen(false));
      }
    })
    .catch((err) => {
      console.log('Error adding book: ' + err);
    });
  };
}

export function userBookArray(bookArray) {
  return {
    type: USER_BOOK_ARRAY,
    userBookArray: bookArray,
  };
}

export function getUserBookArray() {
  return (dispatch) => {
    fetch('api/books/getownedbooks', {
      method: 'GET',
      credentials: 'include',
    })
    .then((resp) => resp.json())
    .then((res) => {
      dispatch(userBookArray(res.returnedBooks));
    })
    .catch((err) => {
      console.log('Error getting user books: ' + err);
    });
  };
}

export function allUsersBookArray(bookArray) {
  return {
    type: ALL_USERS_BOOK_ARRAY,
    allUsersBookArray: bookArray,
  };
}

export function getAllUserBookArray() {
  return (dispatch) => {
    fetch('api/books/getallbooks', {method: 'GET'})
    .then((resp) => resp.json())
    .then((res) => {
      dispatch(allUsersBookArray(res.returnedBooks));
    })
    .catch((err) => {
      console.log('Error getting all users books ' + err);
    });
  };
}

export function deleteAUserBook(bookId) {
  return (dispatch) => {
    fetch('api/books/deletebook', {
      method: 'DELETE',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body:
          JSON.stringify({bookId: bookId}),
    })
    .then((resp) => resp.json())
    .then((res) => {
      if (res.bookDeleted) {
        dispatch(getUserBookArray());
      }
    })
    .catch((err) => {
      console.log('Error deleting book ' + err);
    });
  };
}

// save user id
export function setUserInfo(userId) {
  return {
    type: USER_INFO,
    userInfo: {
      userId: userId,
    },
  };
}

export function setRequestedTradeList(requestedTradeArray) {
  return {
    type: REQUESTED_TRADE_LIST,
    requestedTradeList: requestedTradeArray,
  };
}

export function setPendingTradeList(pendingTradeArray) {
  return {
    type: PENDING_TRADE_LIST,
    pendingTradeList: pendingTradeArray,
  };
}

export function proposeTrade(bookIdWanted, bookIdToGiveUp) {
  return (dispatch) => {
    fetch('api/trades/propose', {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          bookWanted: bookIdWanted,
          bookToGiveUp: bookIdToGiveUp,
      }),
    })
    .then((resp) => resp.json())
    .then((res) => {
      if (res.tradePosted) {
        console.log('Trade posted successfully!');
      } else {
        console.log('Error in posting trade');
      }
    })
    .catch((err) => {
      console.log('Error proposing trade ' + err);
    });
  };
}

export function getTrades() {
  return (dispatch) => {
    fetch('api/trades/getProposed', {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
    })
    .then((resp) => resp.json())
    .then((res) => {
      dispatch(setPendingTradeList(res.pendingTradesArray));
      dispatch(setRequestedTradeList(res.requestedTradesArray));
    })
    .catch((err) => {
      console.log('Error in getting trades ' + err);
    });
  };
}

export function deleteTrade(tradeId) {
  return (dispatch) => {
    fetch('api/trades/deleteTrade', {
      method: 'DELETE',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'tradeId': tradeId}),
    })
    .then((resp) => {
      dispatch(getTrades());
    })
    .catch((err) => {
      console.log('Error in calling delete trade api: ' + err);
    });
  };
}

export function acceptTrade(tradeId) {
  return (dispatch) => {
    fetch('api/trades/acceptTrade', {
      method: 'PUT',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'tradeId': tradeId}),
    })
    .then((resp) => {
      dispatch(getTrades());
    })
    .catch((err) => {
      console.log('Error in calling accept trade api: ' + err);
    });
  };
}

export function checkForExistingUserSession() {
  return (dispatch) => {
    return fetch('api/users/checkSession', {
      method: 'GET',
      credentials: 'include',
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Could not authenticate');
      } else {
        return resp.json();
      }
    })
    .then((res) => {
      if (res.isLoggedIn) {
        dispatch(isLoggedIn(true));
        dispatch(setUserInfo(res.userId));
        return true;
      } else {
        dispatch(isLoggedIn(false));
        dispatch(setUserInfo(null));
        return false;
      }
    })
    .catch((err) => {
      console.log('Error in calling check session api: ' + err);
      return false;
    });
  };
}

export function showSelectBookToGiveUpModal(boolean) {
  return {
    type: SHOW_SELECT_BOOK_TO_GIVE_UP_MODAL,
    showSelectBookToGiveUpModal: boolean,
  };
}

export function setBookIdWanted(bookId) {
  return {
    type: BOOK_ID_WANTED,
    bookIdWanted: bookId,
  };
}

export function facebookAuthenticate(facebookToken) {
  return (dispatch) => {
    return fetch('/api/users/facebook/token', {
      'method': 'POST',
      'credentials': 'include',
      'headers': {'Content-Type': 'application/json'},
      'body': JSON.stringify({'access_token': facebookToken}),
    })
    .then((resp) => resp.json())
    .then((res) => {
      if (res.isLoggedIn) {
        dispatch(userIsLoading(false));
        dispatch(isLoggedIn(true));
        dispatch(userLoginFailed(false));
        dispatch(loginModalIsOpen(false));
        dispatch(setUserInfo(res.userId));
        dispatch(showUserRegisteredAlert(false));
      } else if (!res.isLoggedIn) {
        dispatch(userIsLoading(false));
        dispatch(userLoginFailed(true));
        dispatch(userLoginFailedMessage(res.authError));
      }
    })
    .catch((err) => {
      console.log('Error authenticating Facebook Token: ' + err);
    });
  };
}
