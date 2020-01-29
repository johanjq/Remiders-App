const { Router } = require("express");
const router = Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  patchTodo
} = require("../controllers/todos.controller");

router
  .route("/")
  .get(getTodos)
  .post(createTodo);

router
  .route("/:id")
  .get(getTodo)
  .put(updateTodo)
  .patch(patchTodo)
  .delete(deleteTodo);

module.exports = router;
