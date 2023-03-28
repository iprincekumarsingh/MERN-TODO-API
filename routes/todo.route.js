const express = require('express');
const { route } = require('../app');
const router = express.Router();

const { home, create, todos, todoFindById } = require('../controllers/todoController');

router.route('/').get(home)

router.route('/create').post(create)
router.route('/todos').get(todos)
router.route('/todos/:id').get(todoFindById)

module.exports = router;