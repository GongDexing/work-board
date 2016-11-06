/*jshint esversion:6*/
import 'antd/dist/antd.less';
import '../less/App.less';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { WorkStatus } from '../constant/constant';
import StatusCard from '../components/StatusCard';
import NavBar from '../components/NavBar';
import { fetchUsers } from '../actions/users';
import { allTasks } from '../actions/tasks';
import { getTasks, getSelect } from '../selectors';
class App extends Component{
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.auth !== this.props.auth &&  nextProps.auth.isLogin){
      const { dispatch } = nextProps;
      dispatch(fetchUsers());
      dispatch(allTasks());
    }
  }
  render(){
    const { dispatch, modal, alert, btnStatus, auth, users, projects, members, tasks, project, select } = this.props;
    return (
          <Row>
            <NavBar dispatch={dispatch} modal={modal} alert={alert} btnStatus={btnStatus} auth={auth} users={users} members={members} projects={projects}/>
            {
              auth.isLogin ?
              (
                <Row>
                  <Col span={6}>
                    <StatusCard select={select.doing} userId={auth.id} users={users} members={members} project={project} dispatch={dispatch} tasks={tasks.doing} alert={alert} btnStatus={btnStatus}  status={WorkStatus[0]} />
                  </Col>
                  <Col span={6}>
                    <StatusCard select={select.delay} userId={auth.id} users={users} members={members} project={project} dispatch={dispatch} tasks={tasks.delay} alert={alert} btnStatus={btnStatus} status={WorkStatus[1]} />
                  </Col>
                  <Col span={6}>
                    <StatusCard select={select.done} userId={auth.id} users={users} members={members} project={project} dispatch={dispatch} tasks={tasks.done} alert={alert} btnStatus={btnStatus}  status={WorkStatus[2]} />
                  </Col>
                  <Col span={6}>
                    <StatusCard select={select.discard} userId={auth.id} users={users} members={members} project={project} dispatch={dispatch} tasks={tasks.discard} alert={alert} btnStatus={btnStatus}  status={WorkStatus[3]} />
                  </Col>
                </Row>
              ): <p className='logout-tip'>囧，还不赶紧注册，体验史上最好用的任务管理工具--<strong>任务看板</strong></p>
            }
          </Row>
    );
  }
}
// let oldTs = {doing: [], delay: [], done: [], discard: []};
// function packageName(users, tasks, filter){
//   let json = {};
//   let select = {doing: {}, delay: {}, done: {}, discard: {}};
//   const ts = {
//     doing: tasks.filter(t => t.status === 0),
//     delay: tasks.filter(t => t.status === 1),
//     done: tasks.filter(t => t.status === 2),
//     discard: tasks.filter(t => t.status === 3)
//   };
//   for(const key in ts){
//     json[key] = ts[key].map(t => {
//        t.owner_name = users.filter(u => u.id === t.owner)[0].name;
//        t.charge_name = users.filter(u => u.id === t.charge)[0].name;
//       return t;
//     });
//     select[key].projectNames = json[key].reduce((prev, next) => {
//       if(prev.indexOf(`${next.project_id}##${next.project_name}`) < 0){
//         prev.push(`${next.project_id}##${next.project_name}`);
//       }
//       return prev;
//     }, []);
//     select[key].chargeNames = json[key].reduce((prev, next) => {
//       if(prev.indexOf(`${next.charge}##${next.charge_name}`) < 0){
//         prev.push(`${next.charge}##${next.charge_name}`);
//       }
//       return prev;
//     }, []);
//     if(filter[key].filter !== 'all'){
//       json[key] = json[key].filter(t => {
//         return filter[key].isCharge ?
//           t.charge === parseInt(filter[key].filter) :
//           t.project_id === parseInt(filter[key].filter);
//       });
//     }
//   }
//   oldTs = ts;
//   return { json, select };
// }
// let oldTasks;
function mapStateToProps(state){
  const { modal, alert, btnStatus, auth, users, projects, members, tasks, project, filter } = state;
  //const { json, select } = packageName(users, tasks, filter);
  return {
    modal,
    alert,
    btnStatus,
    auth,
    users,
    projects,
    members,
    tasks: getTasks(state),
    project,
    select: getSelect(state)
  };
}
export default connect(mapStateToProps)(App);
