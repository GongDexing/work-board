'use strict';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.exmail.qq.com',
  secure: true,
  port: 465,
  auth: {
    user: 'project@communion.net.cn',
    pass: 'Project2013'
  }
});

const mailOption = {
  from: '项目管理员<project@communion.net.cn>',
};
const taskDetail = [
  '任务责任人：<b><%charge%></b>',
  '任务周期：<b><%start%></b> 至 <b><%end%></b>',
  '任务创建人：<b><%owner%></b>',
  '归属项目：<b><%project%></b>',
  '任务内容：<b><%intro%></b>'].join('<br/>');
const titleContent = {
  'create': {
    'subject': '创建任务',
    'html': [
      '<br/>任务状态：<b style="background-color:#f3f31b;padding:2px;">进行中</b>',
      taskDetail
    ].join('<br/>')
  },
  'delay': {
    'subject': '延期任务',
    'html':  [
        '<br/>任务状态：<b style="background-color:red;padding:2px;">延期</b>',
        '延期说明：<b style="background-color:red;padding:2px;"><%delay_intro%></b>',
        taskDetail
    ].join('<br/>')
  },
  'done': {
    'subject': '完成任务',
    'html':  [
      '<br/>任务状态：<b style="background-color:#64ce64;padding:2px;">完成</b>',
      '完成说明：<b style="background-color:#64ce64;padding:2px;"><%done_intro%></b>',
      taskDetail
    ].join('<br/>')
  },
  'discard': {
    'subject': '废弃任务',
    'html': [
      '<br/>任务状态：<b style="background-color:#e3dbdb;padding:2px;">废弃</b>',
      '废弃说明：<b style="background-color:#e3dbdb;padding:2px;"><%discard_intro%></b>',
      taskDetail
    ].join('<br/>')
  },
  'assign': {
    'subject': '指派任务',
    'html': [
      '<br/>任务状态：<b style="background-color:#f3f31b;padding:2px;">进行中</b>',
      '指派说明：<b style="background-color:#f3f31b;padding:2px;"><%assign_intro%></b>',
      taskDetail
    ].join('<br/>')
  }
};
exports.send = (to, type, json, callback) => {
  let tc = Object.assign({}, titleContent[type]);
  for(let key in json){
    tc.html = tc.html.replace(`<%${key}%>`, json[key]);
  }
  mailOption.html = tc.html;
  mailOption.subject = tc.subject;
  mailOption.to = to.join(',');
  transporter.sendMail(mailOption, (err, info) => {
    callback(err, info);
  });
}
