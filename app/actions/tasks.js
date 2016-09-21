/*jshint esversion:6*/
import { fetchPost, fetchGet, clearAlertAndDisableBtn, showAlertAndEnableBtn, showAlert, delayHideModal} from './common';
export function addTask(task){
  return (dispatch, getState) => {
    clearAlertAndDisableBtn(dispatch);
    task.token = getState().auth.token;
    fetchPost('/task/add', task, dispatch)
    .then(result => {
      console.log('result', result);
      if(result.errcode === 0){
        showAlert(dispatch, result.errmsg, true);
        delayHideModal(dispatch);
      }else{
        showAlertAndEnableBtn(dispatch, result.errmsg, false);
      }
    });
  };
}
