/*jshint esversion:6*/
import '../less/NewProject.less';
import React, { Component } from 'react';
import { Modal, Button, Form, Input, DatePicker, Col, Transfer } from 'antd';
import AlertMsg from './AlertMsg';
import { ProjectNameRule, DateRule, TextareaRule } from '../validate/rules';
import { addProject } from '../actions/projects';
import { fetchUsers } from '../actions/users';
const createForm = Form.create;
const FormItem = Form.Item;

class NewProject extends Component{
  constructor(props){
    super(props);
    this.getMock = this.getMock.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.disabledStartDate = this.disabledStartDate.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
    this.handleStartToggle = this.handleStartToggle.bind(this);
    this.handleEndToggle = this.handleEndToggle.bind(this);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      mockData: [],
      targetKeys: [],
      startError: '',
      startErrorMsg: '',
      endError: '',
      endErrorMsg: '',
      membersError: '',
      membersErrorMsg: ''
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }
  getMock(){
    return this.props.users.map((user, index) => {
      return {key: index, title: user.name, chosen: false};
    });
  }
  handleOk(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((errs, values) => {
      let errFlag = false;
      if(!this.state.startValue){
        this.setState({
          startError: 'has-error',
          startErrorMsg: '请选择一个日期'
        });
        errFlag = true;
      }
      if(!this.state.endValue){
        this.setState({
          endError: 'has-error',
          endErrorMsg: '请选择一个日期'
        });
        errFlag = true;
      }
      if(this.state.targetKeys.length === 0){
        this.setState({
          membersError: 'has-error',
          membersErrorMsg: '项目成员不能为空'
        });
        errFlag = true;
      }
      if(!!errs || errFlag){
        console.log('errors in form');
        return;
      }
      values.start = this.state.startValue;
      values.end = this.state.endValue;
      values.members = this.state.targetKeys.map(i => {
        return {name: this.props.users[i].name, email: this.props.users[i].email};
      });
      dispatch(addProject(values));
    });
  }
  handleCancel() {
    const { hide } = this.props;
    hide();
  }
  disabledStartDate(startValue) {
    let isDisable = false;
    if (this.state.endValue) {
      isDisable = isDisable || startValue.getTime() > this.state.endValue.getTime();
    }
    return isDisable || startValue.getTime() < new Date().getTime();
  }
  disabledEndDate(endValue) {
    let isDisable = false;
    if (this.state.startValue) {
      isDisable = isDisable || endValue.getTime() < this.state.startValue.getTime();
    }
    return isDisable || endValue.getTime() < new Date().getTime();
  }
  onChange(field, value) {
    console.log(field, 'change', value);
    this.setState({
      [field]: value,
    });
  }
  onStartChange(value) {
    if(value){
      this.setState({
        startError: '',
        startErrorMsg: ''
      });
    }else{
      this.setState({
        startError: 'has-error',
        startErrorMsg: '请选择一个日期'
      });
    }
    this.onChange('startValue', value);
  }
  onEndChange(value) {
    if(value){
      this.setState({
        endError: '',
        endErrorMsg: ''
      });
    }else{
      this.setState({
        endError: 'has-error',
        endErrorMsg: '请选择一个日期'
      });
    }
    this.onChange('endValue', value);
  }
  handleStartToggle({ open }) {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }
  handleEndToggle({ open }) {
    this.setState({ endOpen: open });
  }
  handleChange(targetKeys) {
    console.log('targetKeys', targetKeys);
    if(targetKeys.length === 0){
      this.setState({
        membersError: 'has-error',
        membersErrorMsg: '项目成员不能为空'
      });
    }else{
      this.setState({
        membersError: '',
        membersErrorMsg: ''
      });
    }
    this.setState({ targetKeys });
  }
  render(){
    const { alert, btnStatus } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    return(
      <Modal ref="modal"
        visible={true}
        title="添加项目"
        onOk={this.handleOk} onCancel={this.handleCancel}
        closable={false}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.handleOk} disabled={!btnStatus}>添加</Button>,
          <Button key="back" type="ghost" size="large" onClick={this.handleCancel} disabled={!btnStatus}>取消</Button>
        ]}
      >
        <AlertMsg  alert={alert}/>
        <Form horizontal>
        <FormItem
          {...formItemLayout}
          label='项目名称'
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
            <Input {...getFieldProps('name', ProjectNameRule)}/>
          </FormItem>
          <FormItem {...formItemLayout} label='起止时间' required>
            <Col span="11">
              <div className={this.state.startError}>
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  value={this.state.startValue}
                  placeholder="开始日期"
                  onChange={this.onStartChange}
                  toggleOpen={this.handleStartToggle}
                />
                <div className='err-msg'>{this.state.startErrorMsg}</div>
              </div>
            </Col>
            <Col span="2">
              <p className="ant-form-split">-</p>
            </Col>
            <Col span="11">
              <div className={this.state.endError}>
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  value={this.state.endValue}
                  placeholder="结束日期"
                  onChange={this.onEndChange}
                  open={this.state.endOpen}
                  toggleOpen={this.handleEndToggle}
                />
                <div className='err-msg'>{this.state.endErrorMsg}</div>
              </div>
            </Col>
          </FormItem>
          <FormItem {...formItemLayout} label='项目成员' required>
            <div className={this.state.membersError}>
              <Transfer
                dataSource={this.getMock()}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                titles={['员工列表', '项目成员']}
                render={item => item.title}
              />
              <div className='err-msg'>{this.state.membersErrorMsg}</div>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label='项目介绍' required>
            <Input {...getFieldProps('intro', TextareaRule)} type="textarea" rows={5}/>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default createForm()(NewProject);
