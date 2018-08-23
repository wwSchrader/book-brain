const USER_IS_LOGGED_IN = 'USER_IS_LOGGED_IN';
const USER_IS_LOADING = 'USER_IS_LOADING';
const USERNAME_FETCH_SUCCESSFUL = 'USERNAME_FETCH_SUCCESSFUL';
const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
const LOGIN_MODAL_IS_OPEN = 'LOGIN_MODAL_IS_OPEN';
const USER_LOGIN_FAILURE_MESSAGE = 'USER_LOGIN_FAILURE_MESSAGE';
const ADD_BOOK_MODAL_IS_OPEN = 'ADD_BOOK_MODAL_IS_OPEN';
const BOOK_SEARCH_ARRAY = 'BOOK_SEARCH_ARRAY';

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
          dispatch(isLoggedIn(true));
          dispatch(loginModalIsOpen(false));
        }
      })
      .catch((err) => {
        dispatch(userIsLoading(false));
        console.log('Error registering user: ' + err);
      });
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
