/*jshint esversion:6*/
export default function projects(state = [], action){
  switch (action.type) {
    case 'ADD_PROJECT':
      return [action.project, ...state];
    case 'PROJECT_LIST':
      return action.projects;
    default:
      return state;
  }
}
