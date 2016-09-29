/*jslint node: true */
/*jshint esversion: 6 */
'use strict';
//require('babel-register');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const swig = require('swig');

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  const page = swig.renderFile('index.html');
  res.status(200).send(page);
});

app.listen(app.get('port'), ()=> {
  console.log('Express server listening on port ' + app.get('port'));
});
//各种请求处理
const auth = require('./auth');
const user = require('./user');
const project = require('./project');
const task = require('./task');
app.post('/register', bodyValidate(['name','email','passwd']), auth.register);
app.post('/login', bodyValidate(['name','passwd']), auth.login);
//各种check处理
app.get('/user/check', queryValidate(['name']), user.userCheck);
app.get('/email/check', queryValidate(['email']), user.emailCheck);
app.get('/project/check', queryValidate(['name']), project.check);
//进行token验证
app.use(auth.checkToken);
//以下都是必须要带token的请求
app.get('/token/check', auth.check);
app.get('/user/list', user.list);
app.post('/project/add', bodyValidate(['name','start','end','intro', 'members']), project.add);
app.get('/project/list', project.list);
app.get('/project/member/list', queryValidate(['id']), project.memberList);
app.post('/task/add', bodyValidate(['project_id','start','end','charge','intro']), task.add);
app.post('/task/list', bodyValidate(['status']), task.list);
app.get('/init/tasks', task.init);
app.post('/task/update', bodyValidate(['id']), task.update);

function queryValidate(params){
  return paramsVaildate('get', params);
}
function bodyValidate(params){
  return paramsVaildate('post', params);
}
function paramsVaildate(method, params){
  return (req, res, next) => {
    console.dir(params);
    console.dir(req.body);
    const json = method === 'post' ? req.body : req.query;
    const arr = params.filter(param => !json.hasOwnProperty(param));
    arr.length > 0 ? res.json({errcode: 40002, errmsg: '不合法参数，请重新提交!'}) : next();
  }
}
