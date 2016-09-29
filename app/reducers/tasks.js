const initialState = {
  doing: [],
  delay: [],
  done : [],
  discard: []
}
export default function tasks(state = initialState, action){
  switch (action.type) {
    case 'ALL_TASK':
      return {
        doing: action.tasks.filter(t => t.status === 0),
        delay: action.tasks.filter(t => t.status === 1),
        done: action.tasks.filter(t => t.status === 2),
        discard: action.tasks.filter(t => t.status === 3)
      }
    default:
      return state;
  }
}
