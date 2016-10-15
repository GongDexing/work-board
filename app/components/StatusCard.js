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
    this.state = {
      projectNames: [],
      chargeNames: []
    };
  }
  componentWillReceiveProps(nextProps){
    if(this.state.projectNames.length === 0 && nextProps.tasks.length > 0){
      console.log('nextProps.tasks', nextProps.tasks);
      const tasks = nextProps.tasks;
      const projectNames = tasks.reduce((prev, next) => {
        if(prev.indexOf(`${next.project_id}##${next.project_name}`) < 0){
          prev.push(`${next.project_id}##${next.project_name}`);
        }
        return prev;
      }, []);
      const chargeNames = tasks.reduce((prev, next) => {
        if(prev.indexOf(`${next.charge}##${next.charge_name}`) < 0){
          prev.push(`${next.charge}##${next.charge_name}`);
        }
        return prev;
      }, []);
      this.setState({
        projectNames,
        chargeNames
      });
    }
  }
  render(){
    const { status, tasks, dispatch, userId } = this.props;
    style.background = status.color;
    return (
      <Card title={status.title} extra={<Filter dispatch={dispatch} status={status.value}
                      pNames={this.state.projectNames} cNames={this.state.chargeNames}/>}
        style={style}>
        {
          tasks && tasks.length > 0 ?
            tasks.map((t, index) => <Task userId={userId} key={index} task={t} {...this.props}/>) : ''
        }
      </Card>
    );
  }
}
