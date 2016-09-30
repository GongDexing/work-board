/*jslint node: true */
/*jshint esversion: 6 */
'use strict';
const DB = require('./db');
const db = new DB();
exports.add = (req, res) => {
  let task = req.body;
  task.owner = req.user.id;
  task.time = new Date().getTime();
  db.save('tbl_task', task, (err, result) => {
    if(err){
      res.json({errcode: 40009, errmsg: '添加任务失败，请稍后重新添加'});
    }else{
      res.json({errcode: 0, errmsg: '添加任务成功'});
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
