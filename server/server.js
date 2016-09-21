/*jslint node: true */
/*jshint esversion: 6 */
'use strict';
require('babel-register');
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
//连接mongodb
const mongoose = require('mongoose');
const config = require('./config');
mongoose.connect(config.database);
mongoose.connection.on('error', () => {
  console.info('Error: could not connect to MongoDB');
});
//各种请求处理
const auth = require('./auth');
const user = require('./user');
const project = require('./project');
app.post('/register', auth.register);
app.post('/login', auth.login);
//各种check处理
app.get('/user/check', user.userCheck);
app.get('/email/check', user.emailCheck);
app.get('/project/check', project.check);
//进行token验证
app.use(auth.checkToken);
//以下都是必须要带token的请求
app.get('/token/check', auth.check);
app.post('/project/add', project.add);
app.post('/task/add', project.addTask);
app.get('/project/list', project.list);
app.get('/user/list', user.list);
