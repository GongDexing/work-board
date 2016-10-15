const initialState = [];
export default function tasks(state = initialState, action){
  switch (action.type) {
    case 'ALL_TASK':
      return action.tasks;
    case 'UPDATE_STATUS':
      return state.map( t => {
        if(t.id === action.id){
          t.status = action.status;
        }
        return t;
      });
    default:
      return state;
  }
}
