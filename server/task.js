/*jslint node: true */
/*jshint esversion: 6 */
'use strict';
const DB = require('./db');
const email = require('./email');
const db = new DB();
const yyyyddmm = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
exports.add = (req, res) => {
  let task = req.body;
  task.owner = req.user.id;
  task.time = new Date().getTime();
  console.log('task', task);
  db.save('tbl_task', task, (err, result) => {
    if(err){
      res.json({errcode: 40009, errmsg: '添加任务失败，请稍后重新添加'});
    }else{
      res.json({errcode: 0, errmsg: '添加任务成功'});
      let json = {};
      let to = [];
      json.start = yyyyddmm(new Date(task.start));
      json.end = yyyyddmm(new Date(task.end));
      json.intro = task.intro;
      const sql = `select u.email as email, u.name as charge from tbl_user u where u.id = ${task.charge};
                    select u.email as email, u.name as owner from tbl_user u where u.id = ${task.owner};
                    select p.name as project from tbl_project p where p.id=${task.project_id}`;
      db.query(sql, (err, result) => {
        if(!err && result.length === 3){
          json.charge = result[0][0].charge;
          json.owner = result[1][0].owner;
          json.project = result[2][0].project;
          to.push(result[0][0].email);
          console.log('to', to);
          console.log('json', json);
          if(task.charge !== task.owner) to.push(result[1][0].email);
          email.send(to, 'create', json, (err, info) => {
            if(err) throw err;
          })
        }
      })
    }
  });
}
exports.list = (req, res) => {
  const sql = `select t.id as id,p.id as project_id,p.name as project_name,p.owner as project_owner,
            t.start as start,t.end as end,t.owner as owner,t.charge as charge,t.intro as intro,t.status as status
            from tbl_task t,tbl_project p,tbl_project_user pu
            where pu.user_id=${req.user.id} and p.id=pu.project_id and t.project_id=p.id and t.status=${req.status}`;
  console.log(sql);
  db.query(sql, (err, tasks) => {
    if(err){
      res.json({errcode: 40008, errmsg: '获取项目列表失败'});
    }else{
      res.json({errcode: 0, tasks: tasks});
    }
  });
}
exports.init = (req, res) => {
  const sql = `select t.id as id,p.id as project_id,p.name as project_name,p.owner as project_owner,
            t.start as start,t.end as end,t.owner as owner,t.charge as charge,t.intro as intro,t.status as status
            from tbl_task t,tbl_project p,tbl_project_user pu
            where pu.user_id=${req.user.id} and p.id=pu.project_id and t.project_id=p.id`;
  console.log(sql);
  db.query(sql, (err, tasks) => {
    if(err){
      res.json({errcode: 40009, errmsg: '获取任务列表失败'});
    }else{
      console.log(tasks);
      res.json({errcode: 0, tasks: tasks});
    }
  })
};
exports.update = (req, res) => {
  let task = req.body;
  const id = task.id;
  delete task.id;
  if(task.status && task.status === 2) task.end = new Date().getTime();
  console.log(task);
  db.update('tbl_task', task, {id: id}, (err, result) => {
    if(err){
      console.log(err);
      res.json({errcode: 40010, errmsg: '更新任务失败'});
    }else{
      res.json({errcode: 0, errmsg: '恭喜, 操作成功!'});
    }
  });
}
