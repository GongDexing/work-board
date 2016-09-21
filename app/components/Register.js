/*jshint esversion:6*/

import React, { Component } from 'react';
import { Modal, Button, Form, Input, Checkbox } from 'antd';
import AlertMsg from './AlertMsg';
import { NameRule, EmailRuleWithCheck, PasswdRule } from '../validate/rules';
import { register } from '../actions/auth';
const createForm = Form.create;
const FormItem = Form.Item;

class Register extends Component{
  constructor(props){
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleOk(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((errs, values) => {
      if(!!errs){
        return;
      }
      dispatch(register(values));
    });
  }
  handleCancel(e) {
    const { hide } = this.props;
    hide();
  }
  render(){
    const { alert, btnStatus } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return(
      <Modal ref="modal"
        visible={true}
        title="注册"
        onOk={this.handleOk} onCancel={this.handleCancel}
        closable={false}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.handleOk} disabled={!btnStatus}>注册</Button>,
          <Button key="back" type="ghost" size="large"  onClick={this.handleCancel} disabled={!btnStatus}>取消</Button>
        ]}
      >
        <AlertMsg  alert={alert}/>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label='姓名'
            hasFeedback
            help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
            <Input {...getFieldProps('name', NameRule)}/>
          </FormItem>
          <FormItem {...formItemLayout} label='邮箱' required>
            <Input {...getFieldProps('email', EmailRuleWithCheck)} type='email'/>
          </FormItem>
          <FormItem {...formItemLayout} label='密码' required>
            <Input {...getFieldProps('passwd', PasswdRule)} type="password"/>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default createForm()(Register);
