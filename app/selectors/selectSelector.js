import { createSelector } from 'reselect';

export const getSelect = createSelector(
  [state => state.users, state => state.tasks],
  (users, tasks) => {
    let json = {
      doing: tasks.filter(t => t.status === 0),
      delay: tasks.filter(t => t.status === 1),
      done: tasks.filter(t => t.status === 2),
      discard: tasks.filter(t => t.status === 3)
    };
    let select = {doing: {}, delay: {}, done: {}, discard: {}};
    for(const key in json){
      select[key].projectNames = json[key].reduce((prev, next) => {
        if(prev.indexOf(`${next.project_id}##${next.project_name}`) < 0){
          prev.push(`${next.project_id}##${next.project_name}`);
        }
        return prev;
      }, []);
      select[key].chargeNames = json[key].reduce((prev, next) => {
        const charge_name = users.filter(u => u.id === next.charge)[0].name;
        if(prev.indexOf(`${next.charge}##${charge_name}`) < 0){
          //prev.push(`${next.charge}##${next.charge_name}`);
          prev.push(`${next.charge}##${charge_name}`);
        }
        return prev;
      }, []);
    }
    console.log('select: ', select);
    return select;
  }
);
