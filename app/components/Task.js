/*jshint esversion:6*/
import '../less/Task.less';
import React, { Component } from 'react';
import TaskOperate from './TaskOperate';
import TaskDone from './TaskDone';
import TaskAssign from './TaskAssign';
import TaskDiscard from './TaskDiscard';
import TaskDelay from './TaskDelay';
export default class Task extends Component {
  constructor(props){
    super(props);
    this.renderOperateModal = this.renderOperateModal.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      show: ''
    };
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
      default:
        return <p />;
    }
  }
  render(){
    const { task } = this.props;
    return(
      <div className='task'>
        <div className='task-content'>
          {task.intro}
        </div>
        <div className='task-footer'>
          <span><strong>{task.project_name}</strong></span>
          <span>{task.charge_name}</span>
          <span>{`${yyyyddmm(new Date(task.start))}至${yyyyddmm(new Date(task.end))}`}</span>
        </div>
        <TaskOperate operate={show => this.setState({show})}/>
        {this.renderOperateModal(this.state.show)}
      </div>
    );
  }
}

function yyyyddmm(date){
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
