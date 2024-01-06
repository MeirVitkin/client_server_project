const express = require('express');
const login = require('../db/login');

const loginRoute = express.Router();

loginRoute.get('/', async (req, res) => {
    try{
        if(!req.user){
            res.status(401).send();
        }
        res.json(req.user);
    }catch(err){
         res.statusMessage= err
        res.status(500).send();
    }

})

module.exports = loginRoute