const express = require("express");
const route = express.Router();
const categoryController = require("../controller/category")

route.get("/category", categoryController.getCategories);
route.post("/category", categoryController.addCategory);
route.get("/category/:id", categoryController.getCategoryById);
route.patch("/category/:id", categoryController.editCategory);
route.delete("/category/:id", categoryController.delCategory);

module.exports = route;