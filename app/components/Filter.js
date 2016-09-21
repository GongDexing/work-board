/*jshint esversion:6*/
import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;
const OptGroup = Select.OptGroup;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class Filter extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
      <Select defaultValue="all"
        style={{ width: 200 }}
        showSearch={true}
        onChange={handleChange}
      >
        <Option value="all">所有</Option>
        <OptGroup label="项目">
          <Option value="jack">海南省图书馆智能推送系统</Option>
        </OptGroup>
        <OptGroup label="员工">
          <Option value="gongdexing@communion.net.cn">龚得星</Option>
        </OptGroup>
      </Select>
      </div>
    );
  }
}
