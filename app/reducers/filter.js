const initialState = {
  doing: { isCharge: false, filter: 'all'},
  delay: { isCharge: false, filter: 'all'},
  done: { isCharge: false, filter: 'all'},
  discard: { isCharge: false, filter: 'all'}
};
export default function filter(state = initialState, action){
  switch (action.type) {
    case 'DOING_FILTER':
      return Object.assign({}, state, {
        doing: {
          isCharge: action.isCharge,
          filter: action.filter
        }
      });
    case 'DELAY_FILTER':
      return Object.assign({}, state, {
        delay: {
          isCharge: action.isCharge,
          filter: action.filter
        }
      });
    case 'DONE_FILTER':
      return Object.assign({}, state, {
        done: {
          isCharge: action.isCharge,
          filter: action.filter
        }
      });
    case 'DISCARD_FILTER':
      return Object.assign({}, state, {
        discard: {
          isCharge: action.isCharge,
          filter: action.filter
        }
      });
    default:
      return state;
  }
}
