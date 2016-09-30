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
  this.conn = conn;
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
    if(isEmpty(json) || isEmpty(condition)){
      return callback(null, []);
    }
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
  this.delete = (table, condition, callback) => {
    let conditionArr = [];
    for(let key in condition){
      conditionArr.push(`${key}=${conn.escape(condition[key])}`);
    }
    conn.query(`delete from ${table} where ${conditionArr.join(' and ')}`, (err, result) => {
      callback(err, result);
    });
  };
}

function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}
