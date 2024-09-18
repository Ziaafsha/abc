const express = require('express');
const router = express.Router();

// Import individual route files
const categoriesRoute = require('./category');
const todosRoute = require('./todo');

// Use the imported routes
router.use(categoriesRoute);
router.use(todosRoute);

module.exports = router;