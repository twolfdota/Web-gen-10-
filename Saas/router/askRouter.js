const express = require('express');
const Router = express.Router();
const fs = require('fs');
const fileCtrl = require('../Controller/fileController');
const filePath = "./questions.json";
const askCtrl = require('../Controller/questionController');

Router.get('/', (req, res) => {
    res.render("pages/ask", {message: ""});
});

Router.get('/sub', (req, res)=>{
    res.send({a:4,b:5});
});

Router.post('/', (req, res) => {
    console.log(req.body.question);
    askCtrl.addQuestion(req.body.question, (err, id)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(id);
        }
    });
    
 
    res.render("pages/ask", {message : "Your question have been sent!"});

});

module.exports = Router;