import { fetchGet} from './common';
export function init(){
  return (dispatch, getState) => {
    const { token } = getState().auth;
    fetchGet('/init/tasks?token=' + token);
  }
}
