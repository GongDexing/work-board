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
exports.get = (req, res, next) => {
  const id = req.user.id;
  db.findOne('tbl_user', ['name', 'email', 'tel'], {id: id}, (err, result) => {
    if(err || result.length === 0){
      res.json({errcode: 400011, errmsg: '用户不存在!'});
    }else{
      res.json({errcode: 0, user: result[0]});
    }
  });
}
exports.update = (req, res, next) => {
  const id = req.user.id;
  console.log('update', req.body);
  db.update('tbl_user', req.body, {id: id}, (err, result) => {
    if(err || result.affectedRows !== 1){
      res.json({errcode: 400012, errmsg: '用户消息设置失败!'});
    }else{
      res.json({errcode: 0, errmsg: '用户消息设置成功!'});
    }
  });
}
