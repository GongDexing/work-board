/*jshint esversion:6*/
import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import NewProject from './NewProject';
import NewTask from './NewTask';
import Setting from './Setting';

export default class ModalGroup extends Component {
  constructor(props){
    super(props);
    this.renderModel = this.renderModel.bind(this);
  }
  renderModel(){
    switch (this.props.modal) {
      case 'login':
        return (<Login {...this.props}/>);
      case 'register':
        return (<Register {...this.props}/>);
      case 'project':
        return (<NewProject {...this.props}/>);
      case 'task':
        return (<NewTask {...this.props}/>);
      case 'setting':
        return (<Setting {...this.props}/>);
      default:
        return (<p></p>);
    }
  }
  render(){
    return (
      <div>
        {this.renderModel()}
      </div>
    );
  }
}
