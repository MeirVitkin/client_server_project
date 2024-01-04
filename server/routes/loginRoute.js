const express = require('express');
const login = require('../db/login');

const loginRoute = express.Router();

loginRoute.get('/', async (req, res) => {
    try{
        const userName =  req.query.UserName;
        const password =  req.query.password;
        console.log(userName, password);
        const user = await login(userName, password);
        res.json(user);
    }catch(err){
         res.statusMessage= err
        res.status(500).send();
    }

})

module.exports = loginRoute