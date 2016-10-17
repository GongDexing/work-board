/*jshint esversion:6*/

import React, { Component } from 'react';
import { Modal, Button, Form, Input ,Select } from 'antd';
import AlertMsg from './AlertMsg';
import { TextareaRule, ChargeSelect } from '../validate/rules';
import { fetchMembers } from '../actions/members';
import { update } from '../actions/tasks';
const createForm = Form.create;
const FormItem = Form.Item;

class TaskAssign extends Component{
  constructor(props){
    super(props);
    this.handleOk = this.handleOk.bind(this);
  }
  componentDidMount(){
    const { dispatch, task } = this.props;
    dispatch(fetchMembers(task.project_id));
  }
  handleOk(e) {
    e.preventDefault();
    const { dispatch, form, task, hide} = this.props;
    form.validateFields((errs, values) => {
      if(errs){
        return;
      }
      values.charge = parseInt(values.charge);
      values.id = task.id;
      values.status = task.status;
      dispatch(update(values, hide));
    });
  }
  renderMembersOptions(){
    const { members, task } = this.props;
    return members.filter(m => m.id !== task.charge).map((member, index)=>
      <Select.Option key={index} value={member.id + ''}>{member.name}</Select.Option>
    );
  }
  render(){
    const { alert, btnStatus, task, hide } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 }
    };
    return(
      <Modal ref="modal"
        visible={true}
        title="指派任务"
        onOk={this.handleOk} onCancel={this.handleCancel}
        closable={false}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.handleOk} disabled={!btnStatus}>完成</Button>,
          <Button key="back" type="ghost" size="large"  onClick={hide} disabled={!btnStatus}>取消</Button>
        ]}
      >
        <AlertMsg  alert={alert}/>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label='任务内容'>
            {task.intro}
          </FormItem>
          <FormItem {...formItemLayout} label='归属项目' >
            {task.project_name}
          </FormItem>
          <FormItem {...formItemLayout} label='指派给谁' >
            <Select {...getFieldProps('charge', ChargeSelect)} style={{ width: 250 }}>
              {this.renderMembersOptions()}
            </Select>
          </FormItem>
          <FormItem {...formItemLayout} label='指派说明' required>
            <Input {...getFieldProps('assign_intro', TextareaRule)} type="textarea" rows={6}/>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default createForm()(TaskAssign);
