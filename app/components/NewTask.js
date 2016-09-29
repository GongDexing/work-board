/*jshint esversion:6*/
import React, { Component } from 'react';
import { Modal, Button, Form, Input, DatePicker, Col, Select } from 'antd';
import { TextareaRule } from '../validate/rules';
import AlertMsg from './AlertMsg';
import { fetchProjects } from '../actions/projects';
import { fetchMembers } from '../actions/members';
import { addTask } from '../actions/tasks';

const createForm = Form.create;
const FormItem = Form.Item;

class NewTask extends Component{
  constructor(props){
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.disabledStartDate = this.disabledStartDate.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
    this.handleStartToggle = this.handleStartToggle.bind(this);
    this.handleEndToggle = this.handleEndToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.chargeChange = this.chargeChange.bind(this);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      members: [],
      charge: '',
      startError: '',
      startErrorMsg: '',
      endError: '',
      endErrorMsg: '',
      project: ''
    };
  }
  componentDidMount(){
    this.props.dispatch(fetchProjects());
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.projects.length > 0 && nextProps.projects != this.props.projects){
      const project = nextProps.projects[0];
      this.setState({
        startDate:  new Date(project.start),
        endDate: new Date(project.end),
      });
    }
    if(nextProps.members.length > 0 && nextProps.members != this.props.projects){
      this.setState({
        members: nextProps.members
      })
    }
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
      if(!this.state.project){
        this.setState({
          projectError: 'has-error',
          projectErrorMsg: '请选择归属项目'
        });
        errFlag = true;
      }
      if(!!errs || errFlag){
        console.log('errors in form');
        return;
      }
      values.start = this.state.startValue.getTime();
      values.end = this.state.endValue.getTime();
      values.project_id = this.props.projects[this.state.project].id;
      values.charge = this.state.members[this.state.charge].id;
      dispatch(addTask(values));
    });
  }
  handleCancel() {
    const { hide } = this.props;
    hide();
  }
  disabledStartDate(startValue) {
    let isDisable = false;
    if(this.state.endValue){
      isDisable = startValue.getTime() > this.state.endValue.getTime();
    }
    if(this.state.startDate && this.state.endDate){
      isDisable = isDisable || startValue.getTime() < this.state.startDate.getTime() ||
        startValue.getTime() > this.state.endDate.getTime();
    }
    return isDisable || startValue.getTime() < new Date().getTime();
  }
  disabledEndDate(endValue) {
    let isDisable = false;
    if(this.state.startValue){
      isDisable = isDisable || endValue.getTime() < this.state.startValue.getTime();
    }
    if(this.state.startDate && this.state.endDate){
      isDisable = isDisable || endValue.getTime() > this.state.endDate.getTime() ||
        endValue.getTime() < this.state.startDate.getTime();
    }
    return isDisable || endValue.getTime() < new Date().getTime();
  }
  onChange(field, value) {
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
  renderProjectOptions(){
    const { projects } = this.props;
    return projects.map((project, index)=>
      <Select.Option key={index} value={index + ''}>{project.name}</Select.Option>
    );
  }
  renderMembersOptions(){
    return this.state.members.map((member, index)=>
      <Select.Option key={index} value={index + ''}>{member.name}</Select.Option>
    );
  }
  handleChange(value){
    const project = this.props.projects[parseInt(value)];
    this.props.dispatch(fetchMembers(project.id));
    this.setState({
      startDate:  new Date(project.start),
      endDate: new Date(project.end),
      startValue: null,
      endValue: null,
      charge: '0',
      project: value,
      projectError: '',
      projectErrorMsg: ''
    });
  }
  chargeChange(value){
    this.setState({
      charge: value
    });
  }
  render(){
    const { alert, btnStatus } = this.props;
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 }
    };
    return(
      <Modal ref="modal"
        visible={true}
        title="添加任务"
        onOk={this.handleOk} onCancel={this.handleCancel}
        closable={false}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.handleOk} disabled={!btnStatus}>添加</Button>,
          <Button key="back" type="ghost" size="large" onClick={this.handleCancel} disabled={!btnStatus}>取消</Button>
        ]}
      >
        <AlertMsg  alert={alert}/>
        <Form horizontal>
          <FormItem {...formItemLayout} label='归属项目' required>
            <div className={this.state.projectError}>
              <Select value={this.state.project} style={{ width: 250 }} onChange={this.handleChange}>
                {this.renderProjectOptions()}
              </Select>
              <div className='err-msg'>{this.state.projectErrorMsg}</div>
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label='任务负责人' required>
              <Select value={this.state.charge}  style={{ width: 200 }} onChange={this.chargeChange}>
                {this.renderMembersOptions()}
              </Select>
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
          <FormItem {...formItemLayout} label='任务介绍' required>
            <Input {...getFieldProps('intro', TextareaRule)} type="textarea" rows={5}/>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default createForm()(NewTask);
