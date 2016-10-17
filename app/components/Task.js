/*jshint esversion:6*/
import '../less/Task.less';
import React, { Component } from 'react';
import { Icon } from 'antd';
import TaskOperate from './TaskOperate';
import TaskDone from './TaskDone';
import TaskAssign from './TaskAssign';
import TaskDiscard from './TaskDiscard';
import TaskDelay from './TaskDelay';
import Project from './Project';
const collapseLimit = 50;
export default class Task extends Component {
  constructor(props){
    super(props);
    this.renderOperateModal = this.renderOperateModal.bind(this);
    this.showProject = this.showProject.bind(this);
    this.hide = this.hide.bind(this);
    this.renderIntro = this.renderIntro.bind(this);
    this.state = {
      show: '',
      isCollapse: true
    };
  }
  showProject(e){
    e.preventDefault();
    this.setState({show: 'project'});
  }
  hide(){
    this.setState({show: ''});
  }
  renderOperateModal(show){
    // const { task, alert, btnStatus } = this.props;
    switch (show) {
      case 'done':
        return <TaskDone {...this.props} hide={this.hide}/>;
      case 'delay':
        return <TaskDelay {...this.props} hide={this.hide}/>;
      case 'assign':
        return <TaskAssign {...this.props} hide={this.hide}/>;
      case 'discard':
        return <TaskDiscard {...this.props} hide={this.hide}/>;
      case 'project':
        return <Project {...this.props} hide={this.hide}/>
      default:
        return <p />;
    }
  }
  renderIntro(){
    const { intro } = this.props.task;
    const { isCollapse } = this.state;
    if(intro.length > collapseLimit && isCollapse){
      return <pre className='task-intro'>{`${intro.substring(0, collapseLimit)}...`}
                <span className='collapse-operate' onClick={()=> this.setState({isCollapse: !isCollapse})}> 展开</span>
             </pre>;
    }else if(intro.length > collapseLimit && !isCollapse){
      return <pre className='task-intro'>{`${intro}`}
                <span className='collapse-operate' onClick={()=> this.setState({isCollapse: !isCollapse})}> 收起</span>
             </pre>;
    }else{
      return <pre className='task-intro'>{intro}</pre>;
    }
  }
  render(){
    const { task, userId } = this.props;
    const { status } = task;
    const overdue = (task.status === 0 || task.status === 1) && task.end < new Date().getTime();
    const renderProject = (userId === task.project_owner) ?
      <a onClick={this.showProject}>{task.project_name}</a> :
      <span>{task.project_name}</span>;
    const hasRight = (status === 0 || status === 1) && (task.owner === userId || task.charge === userId);
    return(
      <div className='task'>
        <div className='task-footer'>
          <span><strong>{renderProject}</strong></span>
          <span><strong>{task.charge_name}</strong></span>
          <span>{`${yyyyddmm(new Date(task.start))}至${yyyyddmm(new Date(task.end))}`}</span>
        </div>
        <div className={ overdue ? 'task-overdue task-content ' : 'task-content'}>
          {this.renderIntro()}
        </div>
        { hasRight ? <TaskOperate operate={show => this.setState({show})}/> : <p/>}
        {this.renderOperateModal(this.state.show)}
      </div>
    );
  }
}

function yyyyddmm(date){
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
