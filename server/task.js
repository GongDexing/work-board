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
  db.save('tbl_task', task, (err, result) => {
    if(err){
      res.json({errcode: 40009, errmsg: '添加任务失败，请稍后重新添加'});
    }else{
      res.json({errcode: 0, errmsg: '添加任务成功'});
      sendEmail(task);
    }
  });
}
exports.list = (req, res) => {
  const sql = `select t.id as id,p.id as project_id,p.name as project_name,p.owner as project_owner,
            t.start as start,t.end as end,t.owner as owner,t.charge as charge,t.intro as intro,t.status as status
            from tbl_task t,tbl_project p,tbl_project_user pu
            where pu.user_id=${req.user.id} and p.id=pu.project_id and t.project_id=p.id and t.status=${req.status}`;
  db.query(sql, (err, tasks) => {
    if(err){
      res.json({errcode: 40008, errmsg: '获取项目列表失败'});
    }else{
      res.json({errcode: 0, tasks: tasks});
    }
  });
}
exports.init = (req, res) => {
  const sql = `select t.id as id,p.id as project_id,p.name as project_name,p.owner as project_owner,p.end as project_end,
            t.start as start,t.end as end,t.owner as owner,t.charge as charge,t.intro as intro,t.status as status
            from tbl_task t,tbl_project p,tbl_project_user pu
            where pu.user_id=${req.user.id} and p.id=pu.project_id and t.project_id=p.id`;
  db.query(sql, (err, tasks) => {
    if(err){
      res.json({errcode: 40009, errmsg: '获取任务列表失败'});
    }else{
      res.json({errcode: 0, tasks: tasks});
    }
  })
};
exports.update = (req, res) => {
  let task = req.body;
  console.log('update', task);
  const id = task.id;
  delete task.id;
  if(task.status && task.status === 2) task.end = new Date().getTime();
  db.update('tbl_task', task, {id: id}, (err, result) => {
    if(err){
      res.json({errcode: 40010, errmsg: '更新任务失败'});
    }else{
      res.json({errcode: 0, errmsg: '恭喜, 操作成功!'});
      if(task.assign_intro) task.status = 4;
      db.findOne('tbl_task', selectFields(task.status), {id: id}, (err, result) => {
        if(!err && result.length === 1){
          console.log('task-update', result[0]);
          result[0].status = task.status;
          sendEmail(result[0]);
        }
      });
    }
  });
}
function sendEmail(task){
  let json = {};
  let to = [];
  json.start = yyyyddmm(new Date(task.start));
  json.end = yyyyddmm(new Date(task.end));
  json.intro = task.intro;
  console.log('json', json);
  switch (task.status) {
    case 1:
      json.delay_intro = task.delay_intro;
      break;
    case 2:
      json.done_intro = task.done_intro;
      break;
    case 3:
      json.discard_intro = task.discard_intro;
      break;
    case 4:
      json.assign_intro = task.assign_intro;
      break;
  }
  const sql = `select u.email as email, u.name as charge from tbl_user u where u.id = ${task.charge};
                select u.email as email, u.name as owner from tbl_user u where u.id = ${task.owner};
                select p.name as project from tbl_project p where p.id=${task.project_id}`;
  db.query(sql, (err, result) => {
    if(!err && result.length === 3){
      json.charge = result[0][0].charge;
      json.owner = result[1][0].owner;
      json.project = result[2][0].project;
      to.push(result[0][0].email);
      // console.log('to', to);
      // console.log('json', json);
      if(task.charge !== task.owner) to.push(result[1][0].email);
      email.send(to, selectType(task.status), json, (err, info) => {
        if(err) throw err;
      });
    }
  });
}
function selectFields(status){
  switch (status) {
    case 1:
      return ['start', 'end', 'owner', 'charge', 'project_id', 'delay_intro', 'intro'];
    case 2:
      return ['start', 'end', 'owner', 'charge', 'project_id', 'done_intro', 'intro'];
    case 3:
      return ['start', 'end', 'owner', 'charge', 'project_id', 'discard_intro', 'intro'];
    case 4:
      return ['start', 'end', 'owner', 'charge', 'project_id', 'assign_intro', 'intro'];
  }
}
function selectType(status){
  switch (status) {
    case 1:
      return 'delay';
    case 2:
      return 'done';
    case 3:
      return 'discard';
    case 4:
      return 'assign';
    default:
      return 'create';
  }
}
