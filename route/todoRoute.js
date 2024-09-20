const express = require("express");
const route = express.Router();
const todoController = require("../controller/todoController")

route.get("/todos", todoController.getTodos);
route.post("/todos", todoController.addTodo);
route.get("/todos/:id", todoController.getTodoById);
route.patch("/todos/:id", todoController.editTodo);
route.delete("/todos/:id", todoController.deleteTodo)

module.exports = route;