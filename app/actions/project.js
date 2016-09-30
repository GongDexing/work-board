import { fetchGet, fetchPost, showAlert, clearAlertAndenableBtn, clearAlertAndDisableBtn, delayHideModal, showAlertAndEnableBtn } from './common';

export function fetchProject(id){
  return (dispatch, getState) => {
    const token = getState().auth.token;
    fetchGet(`/project/one?token=${token}&id=${id}`)
    .then(result => {
      console.log('one-project', result);
      if(result.errcode === 0){
        dispatch(currProject(result.project));
      }
    });
  }
}

function currProject(project){
  return {
    type: 'CURRENT_PROJECT',
    project
  };
}

export function updateProject(project, hideModal){
  return (dispatch, getState) => {
    clearAlertAndDisableBtn(dispatch);
    project.token = getState().auth.token;
    console.log(project);
    fetchPost('/project/update', project)
    .then(result => {
      console.log('/project/update', result);
      if(result.errcode === 0){
        showAlert(dispatch, result.errmsg, true);
        setTimeout(() => {
          clearAlertAndenableBtn(dispatch);
          hideModal()
        }, 1200);
      }else{
        showAlertAndEnableBtn(dispatch, result.errmsg, false);
      }
    });
  }
}
