const express = (require = require("express"));

const router = express.Router();
const TodoModel = require("../express-api/models/todoModel");

router.get("/", (req, res) => {
  return res.status(200).send("<h1>Todo Routes</h`>");
});

// GET
// GET ONE
// POST
// PUT / PATCH
// DELETE

module.exports = router;
