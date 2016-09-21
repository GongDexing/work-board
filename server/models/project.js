/*jslint node: true */
/*jshint esversion: 6 */
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  owner: { name: String, email: String },
  start: { type: Date, default: Date.now },
  end: { type: Date, default: Date.now },
  members: [
    { name: String, email: String }
  ],
  intro: String,
  date: {type: Date, default: Date.now},
  tasks: [
    { intro: String,
      start: Date,
      end: Date,
      charge: { name: String, email: String },
      status: { type: Number, default: 0}
    }
  ]
});

module.exports = mongoose.model('Project', projectSchema);
