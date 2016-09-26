/*jslint node: true */
/*jshint esversion: 6 */
'use strict';
const DB = require('./db');
const db = new DB();
exports.check = (req, res) => {
  const name = req.query.name;
  db.count('tbl_project', {name: name}, (err, result) => {
    if(err || result[0].cnt > 0){
      res.json({errcode: 40001, errmsg: '项目名称已经存在，请换个名字!'});
    }else{
      res.json({errcode: 0});
    }
  });
};
exports.add = (req, res) => {
  console.log('project', req.body);
  // res.json({errcode: 40007, errmsg: '添加项目失败，请稍后重新添加!'});
  let project = req.body;
  let members = project.members;
  project.time = new Date().getTime();
  project.owner = req.user.id;
  if(members.indexOf(project.owner) < 0){
    members.push(project.owner)
  }
  delete project.members;
  console.log(project);
  db.save('tbl_project', project, (err, result) => {
    if(err){
      res.json({errcode: 40007, errmsg: '添加项目失败，请稍后重新添加!'});
    }else {
      const project_id = result.insertId;
      const sql = 'insert into tbl_project_user(project_id, user_id) values ' +
        members.map(m => `(${result.insertId}, ${m})`).join(',');
      console.log(sql);
      db.query(sql, (err, result) => {
        if(err){
          res.json({errcode: 40007, errmsg: '添加项目失败，请稍后重新添加!'});
        }else{
          res.json({errcode: 0, errmsg:'添加项目成功!'});
        }
      });
    }
  });
};
exports.list = (req, res) => {
  const user_id = req.user.id;
  const sql = `select p.id,p.name,p.start,p.end from tbl_project p,tbl_project_user pu
              where pu.user_id=${user_id} and p.id=pu.project_id`;
  db.query(sql, (err, projects) => {
    if(err){
      res.json({errcode: 40008, errmsg: '获取项目列表失败'});
    }else{
      res.json({errcode: 0, projects: projects});
    }
  });
};
exports.memberList = (req, res) => {
  const project_id = req.query.id;
  const sql = `select u.id as id,u.name as name from tbl_user u,tbl_project_user pu
              where pu.project_id=${project_id} and u.id=pu.user_id`;
  db.query(sql, (err, members) => {
    if(err){
      res.json({errcode: 40009, errmsg: '获取项目成员列表失败'});
    }else{
      res.json({errcode: 0, members: members});
    }
  })
}
