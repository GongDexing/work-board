/*jshint esversion:6*/
import '../less/Task.less';
import React, { Component } from 'react';
import TaskOperate from './TaskOperate';
export default class Task extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { task } = this.props;
    return(
      <div className='task'>
        <div className='task-content'>
          {task.intro}
        </div>
        <div className='task-footer'>
          <span><strong>{task.project}</strong></span>
          <span>{`${task.start.match(/\d+-\d+-\d+/)[0]}至${task.end.match(/\d+-\d+-\d+/)[0]}`}</span>
          <span>{task.charge.name}</span>
        </div>
        <TaskOperate />
      </div>
    );
  }
}
