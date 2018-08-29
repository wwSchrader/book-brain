export function addBookModalIsOpen(state = false, action) {
  switch (action.type) {
    case 'ADD_BOOK_MODAL_IS_OPEN':
      return action.addBookModalIsOpen;
    default:
      return state;
  }
}

export function bookSearchArray(state = [], action) {
  switch (action.type) {
    case 'BOOK_SEARCH_ARRAY':
      return action.bookSearchArray;
    default:
      return state;
  }
}

export function userBookArray(state = [], action) {
  switch (action.type) {
    case 'USER_BOOK_ARRAY':
      return action.userBookArray;
    default:
      return state;
  }
}

export function allUsersBookArray(state = [], action) {
  switch (action.type) {
    case 'ALL_USERS_BOOK_ARRAY':
      return action.allUsersBookArray;
  default:
    return state;
  }
}
