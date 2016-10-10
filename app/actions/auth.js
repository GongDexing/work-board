/*jshint esversion:6*/
import { fetchPost, fetchGet, clearAlertAndDisableBtn, showAlertAndEnableBtn, showAlert, delayHideModal } from './common';
import { getLocal, putLocal, clearLocal } from '../local/storage';

function auth(form, url, dispatch){
  clearAlertAndDisableBtn(dispatch);
  fetchPost(url, form)
  .then(result => {
    if(result.errcode === 0){
      showAlert(dispatch, result.errmsg, true);
      putLocal('token', result.token);
      dispatch(loginUser(Object.assign({}, form, {
        token: result.token,
        id: result.userId
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
function userInfo(user){
  return {
    type: 'USER_INFO',
    user
  };
}
export function fetchUser(){
  return (dispatch, getState) => {
    const { token } = getState().auth;
    fetchGet(`/user/get?token=${token}`)
    .then(result => {
      console.log('/user/get', result);
      if(result.errcode === 0){
        dispatch(userInfo(result.user));
      };
    });
  }
}
export function updateUser(user){
  return (dispatch, getState) => {
    clearAlertAndDisableBtn(dispatch);
    user.token = getState().auth.token;
    fetchPost('/user/update', user)
    .then(result => {
      console.log('/user/update', result);
      if(result.errcode === 0){
        showAlert(dispatch, result.errmsg, true);
        delayHideModal(dispatch);
      }else{
        showAlertAndEnableBtn(dispatch, result.errmsg, false);
      }
    });
  }
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
  clearLocal();
  return {
    type: 'LOGIN_OUT'
  };
}

export function authCookie(){
  const token = getLocal('token');
  return dispatch =>{
    if(token){
      fetchGet('/token/check?token=' + token)
      .then(result => {
        console.log('/token/check', result);
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
}
