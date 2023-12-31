const express = require('express');
const login = require('../db/login');

const loginRoute = express.Router();

loginRoute.get('/', async (req, res) => {
    try{
        const userName =  req.body.userName;
        const password =  req.body.password;
        const user = await login(userName, password);
        res.json(user);
    }catch(err){
         res.statusMessage= err
        res.status(500).send();
    }

})

module.exports = loginRoute