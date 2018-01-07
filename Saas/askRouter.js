const express = require('express');
const Router = express.Router();
const fs = require('fs');
const fileCtrl = require('./fileController');
const filePath = "./questions.json";

Router.get('/', (req, res) => {
    res.render("pages/ask", {message: ""});
});

Router.get('/sub', (req, res)=>{
    res.send({a:4,b:5});
});

Router.post('/', (req, res) => {
    console.log(req.body.question);
    var questlist = [];
    var quest = {
        id:0,
        content: req.body.question,
        yes:0,
        no:0
    };
    if (fs.existsSync(filePath)){
        questlist = JSON.parse(fileCtrl.readFile(filePath));
        quest.id = questlist.length;
    }
    questlist.push(quest);
    fileCtrl.writeFile(filePath, JSON.stringify(questlist));
    
 
    res.render("pages/ask", {message : "Your question have been sent!"});

});

module.exports = Router;