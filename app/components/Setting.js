/*jshint esversion:6*/
import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { PhoneRule, EmailRule, NewPasswdRule } from '../validate/rules';
import { showAlert } from '../actions/common';
import { fetchUser, updateUser } from '../actions/auth';
import AlertMsg  from '../components/AlertMsg';
const createForm = Form.create;
const FormItem = Form.Item;

class Setting extends Component{
  constructor(props){
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount(){
    this.props.dispatch(fetchUser());
  }
  handleOk(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((errs, values) => {
      if(!!errs){
        return;
      }
      if(!values.tel || values.tel === ''){
        delete values.tel;
      }
      if(!values.passwd || values.passwd === ''){
        delete values.passwd;
      }
      if(isEmpty(values)){
        showAlert(dispatch, '什么都没改呢', false);
      }else{
        dispatch(updateUser(values));
      }
    });
  }
  handleCancel() {
    const { hide } = this.props;
    hide();
  }
  render(){
    const { auth, alert, btnStatus } = this.props;
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return(
      <Modal ref="modal"
        visible={true}
        title="设置"
        onOk={this.handleOk} onCancel={this.handleCancel}
        closable={false}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.handleOk} disabled={!btnStatus}>保存</Button>,
          <Button key="back" type="ghost" size="large" onClick={this.handleCancel} disabled={!btnStatus}>取消</Button>
        ]}
      >
        <AlertMsg alert={alert}/>
        <Form horizontal>
          <FormItem {...formItemLayout} label='姓名'>
            {auth.name}
          </FormItem>
          <FormItem {...formItemLayout} label='邮箱'>
            {auth.email}
          </FormItem>
          <FormItem {...formItemLayout} label='手机号'>
            <Input {...getFieldProps('tel', PhoneRule)}/>
          </FormItem>
          <FormItem {...formItemLayout} label='新密码'>
            <Input {...getFieldProps('passwd', NewPasswdRule)} type='password'/>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}
export default createForm()(Setting);
