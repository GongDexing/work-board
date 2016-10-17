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
    const { status, tasks, dispatch, userId, select } = this.props;
    style.background = status.color;
    return (
      <Card title={status.title} extra={<Filter dispatch={dispatch} status={status.value}
                      pNames={select.projectNames} cNames={select.chargeNames}/>}
        style={style}>
        {
          tasks && tasks.length > 0 ?
            tasks.map((t, index) => <Task userId={userId} key={index} task={t} {...this.props}/>) : ''
        }
      </Card>
    );
  }
}
