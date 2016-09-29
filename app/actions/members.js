/*jshint esversion:6*/
import { fetchGet } from './common';
export function fetchMembers(project_id){
  return (dispatch, getState) => {
    const { token } = getState().auth;
    fetchGet(`/project/member/list?token=${token}&id=${project_id}`)
    .then(result => {
      if(result.errcode === 0){
        dispatch(members(result.members));
      }
    })
  }
}

function members(members){
  return {
    type: 'CURRENT_MEMBERS',
    members
  };
}
