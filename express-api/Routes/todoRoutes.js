const express = require("express");

const router = express.Router();
const TodoModel = require("../models/todoModel");

router.get("/", (req, res) => {
  return res.status(200).send("<h1>Todo Routes</h1>");
});

// GET
router.get("/todos", (req, res) => {
  TodoModel.find((err, results) => {
    if (err) {
      res.status(400).json({ error: true, message: "Could not GET all todos" });
    } else {
      const newResults = results.map((todo) => {
        return {
          id: todo._id,
          title: todo.title,
          done: todo.done,
        };
      });
      res.status(200).json([...newResults]);
    }
  });
});
// GET ONE
router.get("/todo/:id", (req, res) => {
  TodoModel.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(404).json({ error: true, message: "could not get by id" });
    } else {
      res.status(200).json({ error: false, message: "ok", result });
    }
  });
});

// POST
router.post("/todo", (req, res) => {
  const newTodo = new TodoModel(req.body);

  newTodo
    .save()
    .then((todo) => {
      res
        .status(200)
        .json({ id: todo._id, title: todo.title, done: todo.done });
    })
    .catch((err) => {
      res.status(500).json({ error: true, message: "Could not post!" });
    });
});
// PUT / PATCH
// DELETE

router.delete("/todo/:id", (req, res) => {
  TodoModel.findOneAndRemove(req.params.id, (err, todo) => {
    if (err) {
      res.status(500).json({ error: true, message: "could not delete" });
    } else if (todo) {
      res.status(200).json({ message: "Successfully deleted", id: todo._id });
    }
  });
});

module.exports = router;
