/*jshint esversion:6*/
const User = require('./models/user');
exports.userCheck = (req, res) => {
  const name = req.query.name;
  if(name){
    User.findOne({name: name}, (err, user) => {
      if(err || user){
        res.json({errcode: 40001, errmsg: '姓名已经存在，请换个名字'});
      }else{
        res.json({errcode: 0});
      }
    });
  }else{
    res.json({errcode: 40002, errmsg: '不合法参数，请重新提交!'});
  }
};
exports.emailCheck = (req, res) => {
  const email = req.query.email;
  if(email){
    User.findOne({email: email}, (err, user) => {
      if(err || user){
        res.json({errcode: 40003, errmsg: '邮箱已经存在，请换个邮箱'});
      }else{
        res.json({errcode: 0});
      }
    });
  }else{
    res.json({errcode: 40002, errmsg: '不合法参数，请重新提交!'});
  }
};
exports.list = (req, res) => {
  User.find({}, {name: 1, email: 1, _id: 0}, (err, users) => {
    if(err){
      res.json({errcode: 40006, errmsg: '获取用户列表失败'});
    }else{
      res.json({errcode: 0, users: users});
    }
  });
};
