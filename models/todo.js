const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

let Todo = new Schema({
  todo_description: { type: String },
  todo_responsible: { type: String },
  todo_priority: { type: String },
  todo_completed: { type: Boolean },
  date: { type: String, default: moment(Date.now()).format('DD/MM/YYYY') },
});

module.exports = mongoose.model('Todo', Todo);
