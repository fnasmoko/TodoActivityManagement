const express = require('express');
const bodyParser = require('body-parser');
const {getTodo, getTodoByID, addTodo, updateTodo, deleteTodoByID} = require('../controller/todo')
const router = express.Router();

router.use(bodyParser.json());

router.get('/', getTodo)
router.get('/:id', getTodoByID)

router.post('/', addTodo)

router.patch('/:id', updateTodo)

router.delete('/:id', deleteTodoByID)


module.exports = router;