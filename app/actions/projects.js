/*jshint esversion:6*/
import { fetchPost, fetchGet, clearAlertAndDisableBtn, showAlertAndEnableBtn, showAlert, delayHideModal} from './common';

export function addProject(project){
  return (dispatch, getState) => {
    clearAlertAndDisableBtn(dispatch);
    project.token = getState().auth.token;
    console.log(project);
    fetchPost('/project/add', project, dispatch)
    .then(result => {
      if(result.errcode === 0){
        showAlert(dispatch, result.errmsg, true);
        delayHideModal(dispatch);
      }else{
        showAlertAndEnableBtn(dispatch, result.errmsg, false);
      }
    });
  };
}

export function fetchProjects(){
  return (dispatch, getState) => {
    fetchGet('/project/list?token=' + getState().auth.token)
    .then(result => {
      console.log('result', result);
      if(result.errcode === 0){
        dispatch(projects(result.projects));
      }
    });
  };
}

function add(project){
  return {
    type: 'ADD_PROJECT',
    project
  };
}
function projects(projects){
  return {
    type: 'PROJECT_LIST',
    projects
  };
}
