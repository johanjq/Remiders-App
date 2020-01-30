const todosController = {};

const TodoModel = require("../models/Todo");

todosController.getTodos = async (req, res) => {
  const todos = await TodoModel.find();
  res.json(todos);
};

todosController.createTodo = async (req, res) => {
  const { title, description, dueDate, author } = req.body;
  const newTodo = new TodoModel({
    title,
    description,
    dueDate,
    author
  });
  await newTodo.save();
  res.json({ message: "Todo saved" });
};

todosController.getTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await TodoModel.findById(id);
  res.json(todo);
};

todosController.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, author, completed } = req.body;
  await TodoModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      author,
      completed
    }
  );
  res.json({ message: "Todo updated" });
};

todosController.patchTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  await TodoModel.findOneAndUpdate(
    { _id: id },
    {
      completed
    }
  );
  res.json({ message: "field updated" });
};

todosController.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await TodoModel.findByIdAndDelete(id);
  res.json({ message: "todo Deleted" });
};

module.exports = todosController;
