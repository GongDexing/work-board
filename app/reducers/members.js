/*jshint esversion:6*/
export default function members(state = '', action){
  switch (action.type) {
    case 'CURRENT_MEMBERS':
      return action.members;
    default:
      return state;
  }
}
