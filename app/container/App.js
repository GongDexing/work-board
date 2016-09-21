/*jshint esversion:6*/
import 'antd/dist/antd.less';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { WorkStatus } from '../constant/constant';
import StatusCard from '../components/StatusCard';
import NavBar from '../components/NavBar';
class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const { dispatch, modal, alert, btnStatus, auth, users, doing, delay, done, discard, projects } = this.props;
    return (
      <Row>
      <NavBar dispatch={dispatch} modal={modal} alert={alert} btnStatus={btnStatus} auth={auth} users={users} projects={projects}/>
      <Col span={6}>
        <StatusCard  tasks={doing} status={WorkStatus[0]} />
      </Col>
      <Col span={6}>
        <StatusCard  tasks={delay} status={WorkStatus[1]} />
      </Col>
      <Col span={6}>
        <StatusCard  tasks={done} status={WorkStatus[2]} />
      </Col>
      <Col span={6}>
        <StatusCard  tasks={discard} status={WorkStatus[3]} />
      </Col>
      </Row>
    );
  }
}
function classifyTasks(projects){
  let doing = [];
  let delay = [];
  let done = [];
  let discard = [];
  projects.map(project =>
    project.tasks.map(task => {
      task.project  = project.name;
      switch (task.status) {
        case 0:
          return doing.push(task);
        case 1:
          return delay.push(task);
        case 2:
          return done.push(task);
        case 3:
          return discard.push(task);
      }
    })
  );
  return { doing, delay, done, discard };
}


function mapStateToProps(state){
  const { modal, alert, btnStatus, auth, users, projects } = state;
  const { doing, delay, done, discard } = classifyTasks(projects);
  return {
    modal,
    alert,
    btnStatus,
    auth,
    users,
    projects,
    doing,
    delay,
    done,
    discard
  };
}
export default connect(mapStateToProps)(App);
