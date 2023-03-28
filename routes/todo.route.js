const express = require('express');
const { route } = require('../app');
const router = express.Router();

const { home, create, todos, todoFindById, todoDelete,todoUpdate } = require('../controllers/todoController');

router.route('/').get(home)

router.route('/todos/create').post(create)
router.route('/todos').get(todos)
router.route('/todos/:id').get(todoFindById)
router.route('/todos/delete/:id').delete(todoDelete)
router.route('/todos/update/:id').put(todoUpdate)


module.exports = router;