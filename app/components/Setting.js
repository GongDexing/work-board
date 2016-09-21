/*jshint esversion:6*/

import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class Setting extends Component{
  constructor(props){
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleOk() {
    const { hide } = this.props;
    hide();
  }
  handleCancel() {
    const { hide } = this.props;
    hide();
  }
  render(){
    const { getFieldProps } = this.props.form;
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
          <Button key="submit" type="primary" size="large" onClick={this.handleOk}>保存</Button>,
          <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>取消</Button>
        ]}
      >
        <Form horizontal>
          <FormItem {...formItemLayout} label='姓名'  required>
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label='邮箱' required>
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label='手机号' required>
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label='新密码' required>
            <Input />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default createForm()(Setting);
