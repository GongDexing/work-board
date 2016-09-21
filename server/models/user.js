/*jslint node: true */
/*jshint esversion: 6 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  tel: String,
  passwd: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
