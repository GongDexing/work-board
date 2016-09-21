/*jslint node: true */
/*jshint esversion: 6 */
const Project = require('./models/project');
exports.check = (req, res) => {
  const name = req.query.name;
  if(name){
    Project.findOne({name: name}, function(err, project){
      if(err || project){
        res.json({errcode: 40001, errmsg: '项目名称已经存在，请换个名字!'});
      }else{
        res.json({errcode: 0});
      }
    });
  }else{
    res.json({errcode: 40002, errmsg: '不合法参数，请重新提交!'});
  }
};
exports.add = (req, res) => {
  console.log('project', req.body);
  if(req.body.name && req.body.members){
    // console.log('project', req.body);
    const p = Object.assign({}, req.body,{
      owner: {name: req.user.name, email: req.user.email}
    });
    new Project(p).save((err, project) => {
      if(err || !project){
        res.json({errcode: 40007, errmsg: '添加项目失败，请稍后重新添加!'});
      }else {
        res.json({errcode: 0, errmsg:'添加项目成功!', project: project});
      }
    });
  }else{
    res.json({errcode: 40002, errmsg: '不合法参数，请重新提交!'});
  }
};
exports.list = (req, res) => {
  Project.find({}, {name: 1, start: 1, end: 1, members: 1, tasks: 1, owner: 1}, (err, projects) => {
    if(err){
      res.json({errcode: 40008, errmsg: '获取项目列表失败'});
    }else{
      res.json({errcode: 0, projects: projects});
    }
  });
};
exports.addTask = (req, res) => {
  if(req.body.project && req.body.charge){
    const id = req.body.project;
    delete req.body.project;
    console.log('id', id);
    console.log('task', req.body);
    Project.update({_id: id}, { $push: {tasks: req.body}}, (err) => {
      if(err){
          res.json({errcode: 40009, errmsg: '添加任务失败，请稍后重新添加!'});
      }else{
        res.json({errcode: 0, errmsg: '任务添加成功，请刷新页面查看!'});
      }
    });
  }else{
    res.json({errcode: 40002, errmsg: '不合法参数，请重新提交!'});
  }
};
