const express = require('express');
const router = express.Router();

// Import individual route files
const categoriesRoute = require('./categoryRoute');
const todosRoute = require('./todoRoute');

// Use the imported routes
router.use(categoriesRoute);
router.use(todosRoute);

module.exports = router;