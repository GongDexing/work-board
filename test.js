'use strict';
const expect = require('chai').expect;
const DB = require('./server/db');
const db = new DB();
describe('db operate', () => {
	describe('#update', () => {
		it('update jeff email to "jeff@163.com"', (done) => {
				db.update('tbl_user', {email: 'jeff@163.com'}, {name: 'jeff'}, (err, result) => {
					if(err) throw err;
					console.log('hello', result.affectedRows);
					expect(result.affectedRows).to.be.equal(1);
					done();
				});
		});
	});
	describe('#save', () => {
		it('tbl_user have user "jeff"', (done) => {
			db.count('tbl_user', {name: 'jeff'}, (err, result) => {
				if(err) throw err;
				expect(result[0].cnt).to.be.equal(1);
				done();
			});
		});
	});
	describe('#find', () => {
		it('find only a user named "jeff"', (done) => {
			db.find('tbl_user', ['email', 'name'], {name: 'jeff'}, {start: 0, per: 1}, (err, result) => {
				if(err) throw err;
				expect(result[0].name).to.be.equal('jeff');
				done();
			});
		});
	});
	describe('#findOne', () => {
		it('jeff have email "jeff@163.com"', (done) => {
			db.findOne('tbl_user', ['email'], {name: 'jeff'}, (err, result) => {
				if(err) throw err;
				expect(result[0].email).to.be.equal('jeff@163.com');
				done();
			});
		});
	});
})
