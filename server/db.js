'use strict';
const mysql = require('mysql');
const config = require('./config');
const conn = mysql.createConnection(config.database);
conn.connect(err => {
  if(err){
    console.log('error connecting mysql: ' + err.stack);
    return
  }
  console.log('connected mysql as id ' + conn.threadId);
});
module.exports = function(){
  this.query = (sql, callback) => {
    conn.query(sql, (err, result) => {
      callback(err, result);
    })
  };
  this.find = (table, fields, condition, page, callback) => {
    let sql = `select ${fields.join(',')} from ${table}`;
    if(condition){
      let arr = [];
      for(let key in condition){
        arr.push(`${key}=${conn.escape(condition[key])}`);
      }
      sql = `${sql} where ${arr.join(' and ')}`;
    }
    conn.query(`${sql} limit ${page.start}, ${page.per}`, (err, result) => {
      callback(err, result);
    });
  };
  this.findOne = (table, fields, condition, callback) => {
    let sql = `select ${fields.join(',')} from ${table}`;
    if(condition){
      let arr = [];
      for(let key in condition){
        arr.push(`${key}=${conn.escape(condition[key])}`);
      }
      sql = `${sql} where ${arr.join(' and ')}`;
    }
    conn.query(`${sql} limit 0,1`, (err, result) => {
      callback(err, result);
    });
  };
  this.count = (table, condition, callback) => {
    let sql = `select count(id) as cnt from ${table} where`;
    let arr = [];
    for(let key in condition){
      arr.push(`${key}=${conn.escape(condition[key])}`);
    }
    conn.query(`${sql} ${arr.join(' and ')}` , (err, result) => {
      callback(err, result);
    });
  };
  this.save = (table, json, callback) => {
    conn.query(`insert into ${table} set ?`, json, (err, result) => {
      callback(err, result);
    });
  };
  this.update = (table, json, condition, callback) => {
    //db.query(`update ${table} set `)
    let sql = `update ${table}`;
    let setArr = [];
    for(let key in json){
      setArr.push(`${key}=${conn.escape(json[key])}`);
    }
    let conditionArr = [];
    for(let key in condition){
      conditionArr.push(`${key}=${conn.escape(condition[key])}`);
    }
    conn.query(`${sql} set ${setArr.join(',')} where ${conditionArr.join(' and ')}`, (err, result) => {
      callback(err, result);
    })
  };
}
