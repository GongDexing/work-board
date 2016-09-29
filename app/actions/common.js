/*jshint esversion:6*/
import { alertInfo } from './alertInfo';
import { btnStatus } from './btnStatus';
import { showModal } from './modal';

export function fetchGet(url){
  return fetch(url).then(res => res.json());
}

export function fetchPost(url, form){
  return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(form)
        })
        .then(res => res.json());
}

export function clearAlertAndDisableBtn(dispatch){
  dispatch(btnStatus(false));
  dispatch(alertInfo('', false));
}

export function showAlertAndEnableBtn(dispatch, msg, isSuccess){
  dispatch(alertInfo(msg, isSuccess));
  dispatch(btnStatus(true));
}

export function showAlert(dispatch, msg, isSuccess){
  dispatch(alertInfo(msg, isSuccess));
}

export function delayHideModal(dispatch, delay = 1000){
  setTimeout(()=> {
    dispatch(showModal(''));
  }, delay);
}

export function displayModal(dispatch, show){
  console.log('show', show);
  dispatch(alertInfo('', false));
  dispatch(btnStatus(true));
  dispatch(showModal(show));
}
