/*jshint esversion:6*/
import React, { Component } from 'react';
import { Card, Select } from 'antd';
import Task from './Task';
import Filter from './Filter';
let style = {
  marginLeft: '16px',
  marginRight: '16px'
};

export default class StatusCard extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const { status, tasks } = this.props;
    style.background = status.color;
    return (
      <Card title={status.title} extra={<Filter />}
        style={style}>
        {
          tasks && tasks.length > 0 ?
            tasks.map((t, index) => <Task key={index} task={t} />) : ''
        }
      </Card>
    );
  }
}
