/*jshint esversion:6*/
export default function users(state = [], action){
  switch (action.type) {
    case 'USER_LIST':
      return action.users;
    default:
      return state;
  }
}
