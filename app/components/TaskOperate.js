/*jshint esversion:6*/
import '../less/TaskOperate.less';
import React, { Component } from 'react';
import { Button } from 'antd';

export default class TaskOperate extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const { operate } = this.props;
    return (
      <div className='task-operate'>
        <Button type="primary" size="small" onClick={() => operate('done')}>完成</Button>
        <Button size="small" onClick={() => operate('delay')}>延期</Button>
        <Button size="small" onClick={() => operate('assign')}>指派</Button>
        <Button size="small" onClick={() => operate('discard')}>废弃</Button>
        <Button size="small" onClick={() => operate('edit')}>变更</Button>
      </div>
    );
  }
}
