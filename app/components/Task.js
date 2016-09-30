/*jshint esversion:6*/
import '../less/Task.less';
import React, { Component } from 'react';
import TaskOperate from './TaskOperate';
import TaskDone from './TaskDone';
import TaskAssign from './TaskAssign';
import TaskDiscard from './TaskDiscard';
import TaskDelay from './TaskDelay';
import Project from './Project';
export default class Task extends Component {
  constructor(props){
    super(props);
    this.renderOperateModal = this.renderOperateModal.bind(this);
    this.showProject = this.showProject.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      show: ''
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
  render(){
    const { task } = this.props;
    const { status } = task;
    return(
      <div className='task'>

        <div className='task-footer'>
          <span><strong><a href='#' onClick={this.showProject}>{task.project_name}</a></strong></span>
          <span>{task.charge_name}</span>
          <span>{`${yyyyddmm(new Date(task.start))}至${yyyyddmm(new Date(task.end))}`}</span>
        </div>
        <div className='task-content'>
          {task.intro}
        </div>
        {(status === 0 || status === 1) ? <TaskOperate operate={show => this.setState({show})}/> : <p/>}
        {this.renderOperateModal(this.state.show)}
      </div>
    );
  }
}

function yyyyddmm(date){
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
