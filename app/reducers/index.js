/*jshint esversion:6*/
import { combineReducers } from 'redux';
import modal from './modal';
import alert from './alert';
import btnStatus from './btnStatus';
import auth from './auth';
import users from './users';
import projects from './projects';
import members from './members';
import tasks from './tasks';
import project from './project';
import filter from './filter';
const rootReducer = combineReducers({
  modal,
  alert,
  btnStatus,
  auth,
  users,
  projects,
  members,
  tasks,
  project,
  filter
});
export default rootReducer;
