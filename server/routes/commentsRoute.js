const express = require('express');
const {
    getComments,
    addComment,
    editComment,
    deledeComment
} = require('../db/comments');
const commentsRoute = express.Router();

commentsRoute.get('/:id', async (req, res) => {
    try {
        if(req.user.id !== Number(req.params.id)){
            res.status(401).send();
        }
        const comments =await getComments(req.query.postId);
        res.json(comments);
    } catch (err) {
        res.statusMessage = err.message
        res.status(500).send();
    }
})
commentsRoute.post('/:id', async (req, res) => {
    try{
        const userId = req.params.id;
        const title = req.body.title;
        const body = req.body.body;
        await addPost(userId, title, body);
        res.send()
    }catch(err){
        res.statusMessage = err.message
        res.status(500).send();
    }
});
commentsRoute.put('/edit/body/:id', async (req, res) => {
    try{
        editPostBody(req.params.id, req.body.id, req.body.body);
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send();
    }
})
commentsRoute.put('/edit/title/:id', async (req, res) => {
    try{
        editPostTitle(req.params.id, req.body.id, req.body.title);
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send();
    }
})
commentsRoute.delete('/:id', async (req, res) => {
    try{
        deletePost(req.params.id, req.query.id)
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send(); 
    }
})
module.exports = commentsRoute;