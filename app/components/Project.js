/*jshint esversion:6*/
import '../less/NewProject.less';
import React, { Component } from 'react';
import { Modal, Button, Form, Input, DatePicker, Col, Transfer } from 'antd';
import AlertMsg from './AlertMsg';
import { ProjectNameRule, DateRule, TextareaRule } from '../validate/rules';
import { updateProject } from '../actions/project';
import { fetchUsers } from '../actions/users';
import { fetchProject } from '../actions/project';
import { showAlert } from '../actions/common';

const createForm = Form.create;
const FormItem = Form.Item;

class Project extends Component{
  constructor(props){
    super(props);
    this.getMock = this.getMock.bind(this);
    this.handleOk = this.handleOk.bind(this);
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
      membersError: '',
      membersErrorMsg: ''
    };
  }
  componentDidMount() {
    const { dispatch, task } = this.props;
    dispatch(fetchProject(task.project_id));
    dispatch(fetchUsers());
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.project && this.state.targetKeys.length === 0){
      this.setState({targetKeys: nextProps.project.members});
    }
  }
  getMock(){
    return this.props.users.map(user => {
      return {key: user.id, title: user.name, chosen: false};
    });
  }
  handleOk(e) {
    e.preventDefault();
    const { dispatch, project, hide } = this.props;
    this.props.form.validateFields((errs, values) => {
      let errFlag = false;
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
      if(this.state.startValue){
        values.start = this.state.startValue.getTime();
      }
      if(this.state.endValue){
        values.end = this.state.endValue.getTime();
      }
      if(!values.intro){
        delete values.intro;
      }
      if(project.members !== this.state.targetKeys){
        values.members = this.state.targetKeys;
      }
      if(isEmpty(values)){
          showAlert(dispatch, '什么都没改呢', false);
      }else{
        values.id = project.id;
        dispatch(updateProject(values, hide));
      }
    });
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
    const { project_owner } = this.props.task;
    if(targetKeys.indexOf(project_owner) < 0){
      this.setState({
        membersError: 'has-error',
        membersErrorMsg: '项目创建者必须是项目成员'
      });
      return;
    }else if(targetKeys.length === 0){
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
    const { alert, btnStatus, hide, task, project } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    return(
      <Modal ref="modal"
        visible={true}
        title="项目"
        onOk={this.handleOk} onCancel={this.handleCancel}
        closable={false}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.handleOk} disabled={!btnStatus}>更新</Button>,
          <Button key="back" type="ghost" size="large" onClick={hide} disabled={!btnStatus}>取消</Button>
        ]}
      >
        <AlertMsg  alert={alert}/>
        <Form horizontal>
          <FormItem {...formItemLayout} label='项目名称'>
            {project.name}
          </FormItem>
          <FormItem {...formItemLayout} label='起止时间'>
            <Col span="11">
              <DatePicker
                disabledDate={this.disabledStartDate}
                value={this.state.startValue}
                placeholder={yyyyddmm(new Date(project.start))}
                onChange={this.onStartChange}
                toggleOpen={this.handleStartToggle}
              />
            </Col>
            <Col span="2">
              <p className="ant-form-split">-</p>
            </Col>
            <Col span="11">
              <DatePicker
                disabledDate={this.disabledEndDate}
                value={this.state.endValue}
                placeholder={yyyyddmm(new Date(project.end))}
                onChange={this.onEndChange}
                open={this.state.endOpen}
                toggleOpen={this.handleEndToggle}
              />
            </Col>
          </FormItem>
          <FormItem {...formItemLayout} label='项目成员'>
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
          <FormItem {...formItemLayout} label='项目介绍'>
            <Input {...getFieldProps('intro')} type="textarea" placeholder={project.intro} rows={5}/>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
function yyyyddmm(date){
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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
export default createForm()(Project);
