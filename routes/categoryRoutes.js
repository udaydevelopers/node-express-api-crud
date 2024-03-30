// categoryRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
  } = require('../controllers/categoryController');
  
  router.get('/', verifyToken, getCategories);
  router.post('/', verifyToken, createCategory);
  router.put('/:id', verifyToken, updateCategory);
  router.delete('/:id', verifyToken, deleteCategory);

module.exports = router;