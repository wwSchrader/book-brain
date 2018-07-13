export function userIsLoggedIn(state = false, action) {
  switch (action.type) {
    case 'USER_IS_LOGGED_IN':
      return action.isLoggedIn;
    default:
      return state;
  }
}

export function userIsLoading(state = false, action) {
  switch (action.type) {
    case 'USER_IS_LOADING':
      return action.userIsLoading;
    default:
      return state;
  }
}

export function userLoginFailed(state = false, action) {
  switch (action.type) {
    case 'USER_LOGIN_FAILED':
      return action.userLoginFailed;
    default:
      return state;
  }
}

export function userLoginMessageFailure(state = '', action) {
  switch (action.type) {
    case 'USER_LOGIN_FAILURE_MESSAGE':
      return action.userLoginFailureMessage;
    default:
      return state;
  }
}

export function userNameFetch(state = null, action) {
  switch (action.type) {
    case 'USERNAME_FETCH_SUCCESSFUL':
      return action.username;
    default:
      return state;
  }
}

export function loginModalIsOpen(state = false, action) {
  switch (action.type) {
    case 'LOGIN_MODAL_IS_OPEN':
      return action.loginModal;
    default:
      return state;
  }
}
