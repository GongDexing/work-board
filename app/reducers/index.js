/*jshint esversion:6*/
import { combineReducers } from 'redux';
import modal from './modal';
import alert from './alert';
import btnStatus from './btnStatus';
import auth from './auth';
import users from './users';
import projects from './projects';
const rootReducer = combineReducers({
  modal,
  alert,
  btnStatus,
  auth,
  users,
  projects
});
export default rootReducer;
