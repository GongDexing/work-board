/*jshint esversion:6*/
import '../less/TaskOperate.less';
import React, { Component } from 'react';
import { Button } from 'antd';

export default class TaskOperate extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className='task-operate'>
        <Button type="primary" size="small">完成</Button>
        <Button size="small">延期</Button>
        <Button size="small">指派</Button>
        <Button size="small">废弃</Button>
      </div>
    );
  }
}
