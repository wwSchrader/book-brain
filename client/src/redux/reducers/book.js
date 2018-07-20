export function addBookModalIsOpen(state = false, action) {
  switch (action.type) {
    case 'ADD_BOOK_MODAL_IS_OPEN':
      return action.addBookModalIsOpen;
    default:
      return state;
  }
}
