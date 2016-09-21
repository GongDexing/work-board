/*jshint esversion:6*/
import React, { Component } from 'react';
import { Alert } from 'antd';

export default class AlertMsg extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const { msg, isSuccess } = this.props.alert;
    return (
      <div>
        {
          msg === '' ?
            ('') : (<Alert message={msg} type={isSuccess ? 'success' : 'warning'} showIcon />)
        }
      </div>
    );
  }
}
