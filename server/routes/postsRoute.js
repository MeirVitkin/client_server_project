const express = require('express');
const {
    getPosts,
    getUserPosts,
    addPost, 
    editPostBody, 
    editPostTitle, 
    deletePost
} = require('../db/posts');
const postsRoute = express.Router();

postsRoute.get('/', async (req, res) => {
    try {
        const posts =await getPosts();
        res.json(posts);
    } catch (err) {
        res.statusMessage = err.message
        res.status(500).send();
    }
})
postsRoute.post('/:id', async (req, res) => {
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
postsRoute.put('/edit/body/:id', async (req, res) => {
    try{
        editPostBody(req.params.id, req.body.id, req.body.body);
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send();
    }
})
postsRoute.put('/edit/title/:id', async (req, res) => {
    try{
        editPostTitle(req.params.id, req.body.id, req.body.title);
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send();
    }
})
postsRoute.delete('/:id', async (req, res) => {
    try{
        deletePost(req.params.id, req.query.id)
        res.send();
    }catch(err){
        res.statusMessage = err.message;
        res.status(500).send(); 
    }
})
module.exports = postsRoute;