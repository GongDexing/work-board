/*jshint esversion:6*/
const initalState = {
  msg: '',
  isSuccess: false
};

export default function alert(state = initalState, action){
  switch (action.type) {
    case 'CURRENT_ALERT':
      return Object.assign({}, state, {
        msg: action.msg,
        isSuccess: action.isSuccess
      });
    default:
      return state;
  }
}
