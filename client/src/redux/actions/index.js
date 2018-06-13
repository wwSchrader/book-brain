const USER_IS_LOGGED_IN = 'USER_IS_LOGGED_IN';
const USER_IS_LOADING = 'USER_IS_LOADING';
const USERNAME_FETCH_SUCCESSFUL = 'USERNAME_FETCH_SUCCESSFUL';
const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

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

export function usernameFetchSuccessful(items) {
  return {
    type: USERNAME_FETCH_SUCCESSFUL,
    username: items,
  };
}
