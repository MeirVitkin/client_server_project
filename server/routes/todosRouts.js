const express = require('express');
const {
    handleBodyValidation,
    handleEditValidation,
    handelCheckValidation,
    handelIdValidation
}=require('../validation/todoValidation')
const {
    getTodos,
    addTodos,
    editTitle,
    checkTodo,
    deledeTodo
} = require('../db/todos');
const todosRoute = express.Router();


todosRoute.get('/:id',handelIdValidation, async (req, res) => {
    try {
        if(req.user.id !== Number(req.params.id)){
            res.status(401).send();
        }
        const todos =await getTodos(req.params.id);
        res.json(todos);
    } catch (err) {
        res.status(500).send();
    }
})
todosRoute.post('/:id' ,handelIdValidation,handleBodyValidation, async (req, res) => {
    try{
        if(req.user.id !== Number(req.params.id)){
            res.status(401).send();
        }
        const userId = req.params.id;
        const title = req.body.title;
        await addTodos(userId, title);
        res.send()
    }catch(err){
        res.status(500).send();
    }
});
todosRoute.put('/edit/:id',handelIdValidation ,handleEditValidation, async (req, res) => {
    try{
        if(req.user.id !== Number(req.params.id)){
            res.status(401).send();
        }
       await editTitle(req.params.id, req.body.id, req.body.title);
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send();
    }
})
todosRoute.put('/check/:id',handelCheckValidation,handelIdValidation, async (req, res) => {
    try{
        if(req.user.id !== Number(req.params.id)){
            res.status(401).send();
        }
        await checkTodo(req.params.id, req.query.id);
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send();
    }
})
todosRoute.delete('/:id', async (req, res) => {
    try{
        if(req.user.id !== Number(req.params.id)){
            res.status(401).send();
        }
        await deledeTodo(req.params.id, req.query.id)
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send(); 
    }
})
module.exports = todosRoute;