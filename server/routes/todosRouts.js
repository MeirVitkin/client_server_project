const express = require('express');
const {
    getTodos,
    addTodos,
    editTitle,
    checkTodo,
    deledeTodo
} = require('../db/todos');
const todosRoute = express.Router();

todosRoute.get('/:id', async (req, res) => {
    try {
        const todos =await getTodos(req.params.id);
        res.json(todos);
    } catch (err) {
        res.status(500).send();
    }
})
todosRoute.post('/:id', async (req, res) => {
    try{
        const userId = req.params.id;
        const title = req.body.title;
        await addTodos(userId, title);
        res.send()
    }catch(err){
        res.status(500).send();
    }
});
module.exports = todosRoute;