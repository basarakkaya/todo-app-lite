const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  completedDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  order: {
    type: Number,
  },
});

module.exports = Todo = mongoose.model('todo', TodoSchema);
