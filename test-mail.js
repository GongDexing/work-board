'use strict';
const expect = require('chai').expect;
const email = require('./server/email');
const to = ['gongdexing@communion.net.cn', 'gongdexing2008@163.com'];
const json = {
  owner: '龚得星',
  charge: '王辉',
  start: '2016-10-09',
  end: '2016-10-30',
  project: '海南智能推送',
  intro: '数据挖掘小规模验证demo'
}
describe('mail sender', () => {
  it.skip('send email to "gongdexing@communion.net.cn"', (done) => {
      email.send((err, info) => {
        console.log(err);
        console.log(info);
        if(err) throw err;
        done();
      });
  });
  it.skip(`send email to ${to.join(',')}`, (done) => {
    email.send(to, (err, info) => {
      if(err) throw err;
      done();
    })
  });
  it(`send email with create task to ${to.join(',')}`, (done) => {
    email.send(to, 'create', json, (err, info) => {
      if(err) throw err;
      done();
    })
  });
  it(`send email with done task to ${to.join(',')}`, (done) => {
    email.send(to, 'done', json, (err, info) => {
      if(err) throw err;
      done();
    })
  });
  it(`send email with delay task to ${to.join(',')}`, (done) => {
    email.send(to, 'delay', json, (err, info) => {
      if(err) throw err;
      done();
    })
  });
  it(`send email with discard task to ${to.join(',')}`, (done) => {
    email.send(to, 'discard', json, (err, info) => {
      if(err) throw err;
      done();
    })
  });
})
