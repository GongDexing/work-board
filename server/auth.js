/*jslint node: true */
/*jshint esversion: 6 */
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const secret = require('./config').secret;
exports.register = (req, res) => {
  if(req.body.name && req.body.email && req.body.passwd){
    new User(req.body).save((err, user) => {
      if(err){
        res.json({errcode: 40004, errmsg: '注册失败，请稍后重试'});
      }else{
        console.log('user', user);
        delete user.passwd;
        res.json({errcode: 0, errmsg:'注册成功', user: user,
          token: jwt.sign(user, secret, {expiresIn: "7 days"})});
      }
    });
  }else{
    res.json({errcode: 40002, errmsg: '不合法参数，请重新提交!'});
  }
};
exports.login = (req, res) => {
  if(req.body.email && req.body.passwd){
    User.findOne({email: req.body.email, passwd: req.body.passwd}, (err, user) => {
      if(err || !user){
        res.json({errcode: 40004, errmsg: '用户名或者密码错误，请稍后重试'});
      }else{
        console.log('user', user);
        delete user.passwd;
        res.json({errcode: 0, errmsg:'登录成功', user: user,
          token: jwt.sign(user, secret, {expiresIn: "7 days"})});
      }
    });
  }else{
    res.json({errcode: 40002, errmsg: '不合法参数，请重新提交!'});
  }
};
exports.checkToken = (req, res, next) => {
  const token = req.body.token || req.query.token;
  if(token){
    jwt.verify(token, secret, (err, decoded) => {
      if(err){
        res.json({errcode: 40005, errmsg: '登录状态已经失效，请重新登录'});
      }else{
        //console.log('decoded', decoded._doc);
        req.user = decoded._doc;
        next();
      }
    });
  }else{
    res.json({errcode: 40006, errmsg: '用户还未登录，赶紧登录体验地球上最好用的任务管理系统!!!'});
  }
};
exports.check = (req, res, next) => {
    if(req.user.name && req.user.email){
      res.json({errcode: 0, user: req.user});
    }else{
      res.json({errcode: 40005, errmsg: '登录状态已经失效，请重新登录'});
    }
};
