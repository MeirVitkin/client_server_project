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
todosRoute.put('/edit/:id', async (req, res) => {
    try{
       await editTitle(req.params.id, req.body.id, req.body.title);
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send();
    }
})
todosRoute.put('/check/:id', async (req, res) => {
    try{
        await checkTodo(req.params.id, req.query.id);
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send();
    }
})
todosRoute.delete('/:id', async (req, res) => {
    try{
        await deledeTodo(req.params.id, req.query.id)
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send(); 
    }
})
module.exports = todosRoute;