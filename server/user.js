/*jshint esversion:6*/
const DB = require('./db');
const db = new DB();
exports.userCheck = (req, res) => {
  db.count('tbl_user', {name: req.query.name}, (err, result) => {
    if(err || result[0].cnt > 0){
      res.json({errcode: 40001, errmsg: '姓名已经存在，请换个名字'});
    }else{
      res.json({errcode: 0});
    }
  });
};
exports.emailCheck = (req, res) => {
  db.count('tbl_user', {email: req.query.email}, (err, result) => {
    if(err || result[0].cnt > 0){
      res.json({errcode: 40003, errmsg: '邮箱已经存在，请换个邮箱'});
    }else{
      res.json({errcode: 0});
    }
  });
};
exports.list = (req, res) => {
  db.query('select id, name from tbl_user', (err, users) => {
    if(err){
      res.json({errcode: 40006, errmsg: '获取用户列表失败'});
    }else{
      console.log(users);
      res.json({errcode: 0, users: users});
    }
  });
};
