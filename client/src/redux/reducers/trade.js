export function requestedTradeList(state = [], action) {
  switch (action.type) {
    case 'REQUESTED_TRADE_LIST':
      return action.requestedTradeList;
    default:
      return state;
  }
}

export function pendingTradeList(state = [], action) {
  switch (action.type) {
    case 'PENDING_TRADE_LIST':
      return action.pendingTradeList;
    default:
      return state;
  }
}
