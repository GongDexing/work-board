/*jshint esversion:6*/

import React, { Component } from 'react';
import { Modal, Button, Form, Input, Checkbox } from 'antd';
import AlertMsg from './AlertMsg';
import { TextareaRule } from '../validate/rules';
const createForm = Form.create;
const FormItem = Form.Item;

class TaskAssign extends Component{
  constructor(props){
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleOk(e) {

  }
  handleCancel(e) {

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
        title="指派任务"
        onOk={this.handleOk} onCancel={this.handleCancel}
        closable={false}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.handleOk} disabled={!btnStatus}>完成</Button>,
          <Button key="back" type="ghost" size="large"  onClick={this.handleCancel} disabled={!btnStatus}>取消</Button>
        ]}
      >
        <AlertMsg  alert={alert}/>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label='任务内容'>
            特嗯嗯嗯嗯嗯嗯
          </FormItem>
          <FormItem {...formItemLayout} label='归属项目' >
            海南大数据智能推送
          </FormItem>
          <FormItem {...formItemLayout} label='完成说明' required>
            <Input {...getFieldProps('finish_intro', TextareaRule)} type="textarea" rows={5}/>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default createForm()(TaskAssign);
