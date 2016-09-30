/*jshint esversion:6*/

import React, { Component } from 'react';
import { Modal, Button, Form, Input, Checkbox, DatePicker } from 'antd';
import AlertMsg from './AlertMsg';
import { TextareaRule, DateRule } from '../validate/rules';
import { update } from '../actions/tasks';
const createForm = Form.create;
const FormItem = Form.Item;

class TaskDone extends Component{
  constructor(props){
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.disabledStartDate = this.disabledStartDate.bind(this);
  }
  handleOk(e) {
    e.preventDefault();
    const { dispatch, form, task,  hide} = this.props;
    form.validateFields((errs, values) => {
      if(errs){
        return;
      }
      values.id = task.id;
      values.status = 1;
      values.end = values.end.getTime();
      dispatch(update(values, hide));
    });
  }
  disabledStartDate(startValue){
    const { end } = this.props.task;
    return startValue.getTime() <= end;
  }
  render(){
    const { alert, btnStatus, task, hide } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
    return(
      <Modal ref="modal"
        visible={true}
        title="延期任务"
        closable={false}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.handleOk} disabled={!btnStatus}>延期</Button>,
          <Button key="back" type="ghost" size="large"  onClick={hide} disabled={!btnStatus}>取消</Button>
        ]}
      >
        <AlertMsg  alert={alert}/>
        <Form horizontal>
          <FormItem {...formItemLayout} label='任务内容'>
            {task.intro}
          </FormItem>
          <FormItem {...formItemLayout} label='归属项目' >
            {task.project_name}
          </FormItem>
          <FormItem {...formItemLayout} label='延期至'>
            <DatePicker {...getFieldProps('end', DateRule)} disabledDate={this.disabledStartDate}/>
          </FormItem>
          <FormItem {...formItemLayout} label='延期说明' required>
            <Input {...getFieldProps('delay_intro', TextareaRule)} type="textarea" rows={6}/>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default createForm()(TaskDone);
