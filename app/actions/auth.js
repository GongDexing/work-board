/*jshint esversion:6*/
import { fetchPost, fetchGet, clearAlertAndDisableBtn, showAlertAndEnableBtn, showAlert, delayHideModal } from './common';
import { getLocal, putLocal, clearLocal } from '../local/storage';

function auth(form, url, dispatch){
  clearAlertAndDisableBtn(dispatch);
  fetchPost(url, form, dispatch)
  .then(result => {
    console.log('result', result);
    if(result.errcode === 0){
      showAlert(dispatch, result.errmsg, true);
      putLocal('token', result.token);
      dispatch(loginUser(Object.assign({}, result.user, {
        token: result.token
      })));
      delayHideModal(dispatch);
    }else{
      showAlertAndEnableBtn(dispatch, result.errmsg, false);
    }
  });
}
function loginUser(user){
    return {
      type: 'LOGIN_USER',
      user
    };
}
export function register(form){
  return dispatch => {
    auth(form, '/register', dispatch);
  };
}
export function login(form){
  return dispatch => {
    auth(form, '/login', dispatch);
  };
}

export function logout(){
  return {
    type: 'LOGIN_OUT'
  };
}

export function authCookie(){
  const token = getLocal('token');
  if(token){
    return dispatch =>
    fetchGet('/token/check?token=' + token)
    .then(result => {
      if(result.errcode === 0){
        dispatch(loginUser(Object.assign({}, result.user, {
          token: token
        })));
      }else{
        clearLocal();
      }
    });
  }
}
