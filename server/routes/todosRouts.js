const express = require('express');
const Joi = require("joi");
const authenticate = require("./authenticate");

const {
    getTodos,
    addTodos,
    editTitle,
    checkTodo,
    deledeTodo
} = require('../db/todos');
const todosRoute = express.Router();

function handleBodyValidation(req, res, next) {
    const setTodos = Joi.object({
        title: Joi.string()
    });
    const { error } = setTodos.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}
function handleEditValidation(req, res, next) {
    const editTodos = Joi.object({
        id: Joi.number(),
        title: Joi.string()
    });
    const { error } = editTodos.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}

function idCheck(req, res, next) {
    const idSchema = Joi.number().min(1).required();
    const { error } = idSchema.validate(req.params.id);
    const error2 = idSchema.validate(req.query.id);
    if (error || error2.error) {
        res.status(400).send(error? error.details[0].message: error2.error.details[0].message);
        return;
    }
    next();
}


todosRoute.get('/:id', async (req, res) => {
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
todosRoute.post('/:id',handleBodyValidation, async (req, res) => {
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
todosRoute.put('/edit/:id',handleEditValidation, async (req, res) => {
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
todosRoute.put('/check/:id',idCheck, async (req, res) => {
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