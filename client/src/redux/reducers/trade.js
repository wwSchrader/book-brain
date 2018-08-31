export function requestedTradeList(state = [], action) {
  switch (action.type) {
    case 'REQUESTED_TRADE_LIST':
      return action.requestedTradeList;
    default:
      return state;
  }
}
