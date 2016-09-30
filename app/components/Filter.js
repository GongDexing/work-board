/*jshint esversion:6*/
import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;
const OptGroup = Select.OptGroup;

export default class Filter extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  render(){
    const { pNames, cNames } = this.props;
    return (
      <div>
      <Select defaultValue="all"
        style={{ width: 200 }}
        showSearch={true}
        onChange={this.handleChange}
      >
        <Option value="all">所有</Option>
        <OptGroup label="归属项目">
          {
            pNames.map((name, index) => {
              const arr = name.split('##');
              return <Option key={index} value={`project-${arr[0]}`}>{arr[1]}</Option>;
            })
          }
        </OptGroup>
        <OptGroup label="任务负责人">
          {
            cNames.map((name, index) => {
              const arr = name.split('##');
              return <Option key={index} value={`charge-${arr[0]}`}>{arr[1]}</Option>;
            })
          }
        </OptGroup>
      </Select>
      </div>
    );
  }
}
