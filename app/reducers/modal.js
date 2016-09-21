/*jshint esversion:6*/
export default function modal(state = '', action){
  switch (action.type) {
    case 'SHOW_MODAL':
      return action.show;
    default:
      return state;
  }
}
