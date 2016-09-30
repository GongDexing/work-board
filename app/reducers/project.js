export default function project(state = {}, action){
  switch (action.type) {
    case 'CURRENT_PROJECT':
      return action.project;
    default:
      return state;
  }
}
