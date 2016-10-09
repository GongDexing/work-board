/*jshint esversion:6*/
export default function user(state = {}, action){
  switch (action.type) {
    case 'LOGIN_USER':
      return Object.assign({}, action.user, {
        isLogin: true
      });
    case 'USER_INFO':
      return Object.assign({}, state, {
        email: action.user.email,
        tel: action.user.tel
      });
    case 'LOGIN_OUT':
      return {};
    default:
      return state;
  }
}
