const express = require('express');
const todoRoutes = express.Router();

let Todo = require('../models/todo');

todoRoutes.route('/').get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route('/:id').get(function (req, res) {
  let id = req.params.id;
  Todo.findById(id, function (err, todo) {
    res.json(todo);
  });
});

todoRoutes.route('/').post(function (req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: 'todo add successfully' });
    })
    .catch((err) => {
      res.status(400).send('adding new todo failed');
    });
});

todoRoutes.route('/:id').patch(function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo) {
      res.status(404).send('data is not found');
    } else {
      if (req.body.todo_description)
        todo.todo_description = req.body.todo_description;
      if (req.body.todo_responsible)
        todo.todo_responsible = req.body.todo_responsible;
      if (req.body.todo_priority) todo.todo_priority = req.body.todo_priority;
      if (req.body.todo_completed)
        todo.todo_completed = req.body.todo_completed;
      todo
        .save()
        .then((todo) => {
          res.json('todo updated');
        })
        .catch((err) => {
          res.status(400).send('Update not possible');
        });
    }
  });
});

todoRoutes.route('/:id').delete(function (req, res) {
  Todo.findByIdAndDelete(req.params.id, function (err, todo) {
    if (err) res.status(400).send(err);
    else res.send('Todo deleted successfully');
  });
});

module.exports = todoRoutes;
