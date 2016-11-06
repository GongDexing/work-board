import { createSelector } from 'reselect';

export const getTasks = createSelector(
  [state => state.users, state => state.tasks, state => state.filter],
  (users, tasks, filter) => {
    let tasksJson = {
      doing: tasks.filter(t => t.status === 0),
      delay: tasks.filter(t => t.status === 1),
      done: tasks.filter(t => t.status === 2),
      discard: tasks.filter(t => t.status === 3)
    };
    for(let key in filter){
      if(filter[key].filter !== 'all'){
        tasksJson[key] = tasksJson[key].filter(t => {
          return filter[key].isCharge ?
            t.charge === parseInt(filter[key].filter) :
            t.project_id === parseInt(filter[key].filter);
        });
      }
      tasksJson[key] = tasksJson[key].map(t => {
        t.owner_name = users.filter(u => u.id === t.owner)[0].name;
        t.charge_name = users.filter(u => u.id === t.charge)[0].name;
        return t;
      });
    }
    return tasksJson;
  }
);
