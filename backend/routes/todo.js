const express = require('express')
const router = express.Router();
const Todo = require('../models/todoModel')
const requireAuth = require('../middleware/requireAuth')
const {
    createTodo,
    getTodo,
    getOneTodo,
    deleteTodo,
    updateTodo,
} = require('../controller/todoController')


router.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
})

router.use(requireAuth);

//GET all todos
router.get('/', getTodo)

//POST todos
router.post('/', createTodo)

//GET a single todo
router.get('/:id',getOneTodo)

//DELETE a single todo
router.delete('/delete/:id',deleteTodo)

//UPDATE a single todo
router.patch('/update/:id',updateTodo)

module.exports = router