/*jslint node: true */
/*jshint esversion: 6 */
'use strict';
const DB = require('./db');
const db = new DB();
exports.add = (req, res) => {
  const task = req.body;
  db.save('tbl_task', task, (err, result) => {
    if(err){
      res.json({errcode: 40009, errmsg: '添加任务失败，请稍后重新添加'});
    }else{
      res.json({errcode: 0, errmsg: '添加任务成功', id: result.insertId});
    }
  });
}
exports.list = (req, res) => {
  const sql = `select t.id as id,p.id as project_id,p.name as project_name,p.owner as project_owner,
            t.start as start,t.end as end,t.owner as owner,t.charge as charge,t.intro  as intro
            from tbl_task t,tbl_project p,tbl_project_user pu
            where pu.user_id=${req.user_id} and p.id=pu.project_id and t.project_id=p.id and t.status=${req.status}`;
  db.query(sql, (err, tasks) => {
    if(err){
      res.json({errcode: 40008, errmsg: '获取项目列表失败'});
    }else{
      res.json({errcode: 0, tasks: tasks});
    }
  });
}
