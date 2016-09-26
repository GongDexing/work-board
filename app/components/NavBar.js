/*jshint esversion:6*/
import '../less/NavBar.less';
import React, { Component } from 'react';
import { Row, Col, Button, Icon, Menu, Dropdown } from 'antd';
import ModalGroup from './ModalGroup';
import { logout, authCookie } from '../actions/auth';
import { displayModal } from '../actions/common';
import { fetchProjects } from '../actions/projects';

export default class NavBar extends Component{
  constructor(props){
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.modal = this.modal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.renderLoginArea = this.renderLoginArea.bind(this);
  }
  // componentWillReceiveProps(nextProps){
  //   if(nextProps.auth !== this.props.auth && nextProps.auth.isLogin){
  //     nextProps.dispatch(fetchProjects());
  //   }
  // }
  componentDidMount(){
    this.props.dispatch(authCookie());
  }
  modal(show){
    displayModal(this.props.dispatch, show);
  }
  hideModal(){
    this.modal('');
  }
  login(){
    this.modal('login');
  }
  register(){
    this.modal('register');
  }
  handleMenuClick(e){
    const { dispatch } = this.props;
    switch (e.key) {
      case '0':
        return this.modal('setting');
      case '2':
        return this.modal('project');
      case '3':
        return this.modal('task');
      case '1':
        return dispatch(logout());
    }
  }
  renderLoginArea(){
    const { auth, dispatch } = this.props;
    if(auth.isLogin){
      const userMenu = (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="0"><Icon type="setting" /> 设置</Menu.Item>
          <Menu.Item key="1"><Icon type="logout" /> 退出</Menu.Item>
        </Menu>
      );
      const addMenu = (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="2"><Icon type="team" /> 项目</Menu.Item>
          <Menu.Item key="3"><Icon type="solution" /> 任务</Menu.Item>
        </Menu>
      );
      return (
        <div className='login-area'>
          <Dropdown overlay={addMenu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              添加 <Icon type="down" />
            </a>
          </Dropdown>
          <Dropdown overlay={userMenu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              {auth.name} <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      );
    }
    return (
      <div className='login-area'>
        <Button type="primary" onClick={this.login}>登录</Button>
        &nbsp;&nbsp;
        <Button type="ghost" onClick={this.register}>注册</Button>
      </div>
    );
  }
  render(){
    const { dispatch, modal, alert, btnStatus, users, projects} = this.props;
    return (
      <header id='header' className='clearfix'>
        <Row>
          <Col span={4}>
            <a id='logo'>
              <span>任务看板</span>
            </a>
          </Col>
          <Col span={20}>
            {this.renderLoginArea()}
          </Col>
        </Row>
        <ModalGroup {...this.props} hide={this.hideModal}/>
      </header>
    );
  }
}
