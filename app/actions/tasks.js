/*jshint esversion:6*/
import { fetchPost, fetchGet, clearAlertAndenableBtn, clearAlertAndDisableBtn, showAlertAndEnableBtn, showAlert, delayHideModal} from './common';
export function addTask(task){
  return (dispatch, getState) => {
    clearAlertAndDisableBtn(dispatch);
    task.token = getState().auth.token;
    fetchPost('/task/add', task)
    .then(result => {
      if(result.errcode === 0){
        showAlert(dispatch, result.errmsg, true);
        dispatch(allTasks());
        delayHideModal(dispatch);
      }else{
        showAlertAndEnableBtn(dispatch, result.errmsg, false);
      }
    });
  };
}
export function allTasks(){
  return (dispatch, getState) => {
    const { token } = getState().auth;
    fetchGet('/init/tasks?token=' + token)
    .then(result => {
      if(result.errcode === 0){
        console.log('fetch tasks', result.tasks);
        dispatch(tasks(result.tasks));
      }
    });
  }
}
export function update(form, hideModal){
  return (dispatch, getState) => {
    console.log('update task', form);
    clearAlertAndDisableBtn(dispatch);
    form.token = getState().auth.token;
    fetchPost('/task/update', form)
    .then(result => {
      if(result.errcode === 0){
        showAlert(dispatch, result.errmsg, true);
        dispatch(updateStatus(form.id, form.status));
        setTimeout(() => {
          clearAlertAndenableBtn(dispatch);
          hideModal();
        }, 1200);
      }else{
        showAlertAndEnableBtn(dispatch, result.errmsg, false);
      }
    });
  };
}
function updateStatus(id, status){
  console.log(`${id}--${status}`);
  return {
    type: 'UPDATE_STATUS',
    id,
    status
  };
}
function tasks(tasks){
  return {
    type: 'ALL_TASK',
    tasks
  }
}
