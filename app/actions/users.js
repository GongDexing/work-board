/*jshint esversion:6*/
import { fetchGet } from './common';
export function fetchUsers(){
  return (dispatch, getState) => {
    fetchGet('/user/list?token=' + getState().auth.token)
    .then(result => {
      console.dir(result);
      if(result.errcode === 0){
        console.log('fetch', result);
        dispatch(users(result.users));
      }
    });
  };
}

function users(users){
  return {
    type: 'USER_LIST',
    users
  };
}
