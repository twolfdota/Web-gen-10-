const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.render("Question page");
});

Router.get('/:id', (req, res)=>{
    
});

Router.post('/', (req, res) => {
    
});

module.exports = Router;