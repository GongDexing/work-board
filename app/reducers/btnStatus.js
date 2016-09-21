/*jshint esversion:6*/
export default function btnStatus(state = true, action){
  switch (action.type) {
    case 'BTN_STATUS':
      return action.status;
    default:
      return state;
  }
}
