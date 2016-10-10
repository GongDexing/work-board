/*jslint node: true */
/*jshint esversion: 6 */
'use strict';
const jwt = require('jsonwebtoken');
const secret = require('./config').secret;
const DB = require('./db');
const db = new DB();
exports.register = (req, res) => {
  let user = req.body;
  user.time = new Date().getTime();
  db.save('tbl_user', user, (err, result) => {
    if(err){
      res.json({errcode: 40004, errmsg: '注册失败，请稍后重试'});
    }else{
      delete user.passwd;
      delete user.time;
      delete user.email;
      user.id = result.insertId;
      res.json({errcode: 0, errmsg:'注册成功', userId: user.id,
        token: jwt.sign(user, secret, {expiresIn: "7 days"})});
    }
  });
};
exports.login = (req, res) => {
  db.findOne('tbl_user', ['id', 'name'], req.body, (err, result) => {
    if(err || result.length === 0){
      res.json({errcode: 40004, errmsg: '用户名或者密码错误，请稍后重试'});
    }else{
      res.json({errcode: 0, errmsg:'登录成功', userId: result[0].id,
        token: jwt.sign(result[0], secret, {expiresIn: "7 days"})});
    }
  });
};
exports.checkToken = (req, res, next) => {
  const token = req.body.token || req.query.token;
  if(token){
    jwt.verify(token, secret, (err, decoded) => {
      if(err){
        res.json({errcode: 40005, errmsg: '登录状态已经失效，请重新登录'});
      }else{
        req.user = {
          id: decoded.id,
          name: decoded.name
        };
        if(req.body) delete req.body.token;
        if(req.query) delete req.query.token;
        next();
      }
    });
  }else{
    res.json({errcode: 40006, errmsg: '用户还未登录，赶紧登录体验地球上最好用的任务管理系统!!!'});
  }
};
exports.check = (req, res, next) => {
    const user = req.user;
    if(user.name && user.id){
      res.json({errcode: 0, user: user});
    }else{
      res.json({errcode: 40005, errmsg: '登录状态已经失效，请重新登录'});
    }
};
