const express = require('express');
const Router = express.Router();
const fileCtrl = require("./fileController");
const filePath = "./questions.json";

function randomInt(min, max){
    return Math.floor(Math.random()*(max - min)) + min;
}
function getList(){
    var list = [];
    list = JSON.parse(fileCtrl.readFile(filePath));
    return list;
}
Router.get('/', (req, res)=>{
    if (!require('fs').existsSync(filePath) || JSON.parse(fileCtrl.readFile(filePath)).length == 0){
        res.render('pages/ask', {message: "No question found, be the first one to ask!"});
    }
    var list = getList();
    var id = randomInt(0, list.length);
    var question = list[id];
    res.render('pages/question', {
        content : question.content,
        id : question.id
    });    
})

Router.post('/yes', (req, res) =>{
    var list = getList();
    var id = parseInt(req.body.myid);
    list[id].yes += 1;
    fileCtrl.writeFile(filePath, JSON.stringify(list));
    res.redirect(`/question/${id}`);
})

Router.post('/no', (req, res) =>{
    var list = getList();
    var id = parseInt(req.body.myid);
    list[id].no += 1;
    fileCtrl.writeFile(filePath, JSON.stringify(list));
    res.redirect(`/question/${id}`);
})

Router.post('/', (req, res) =>{
    
    var list = getList();
    var id = randomInt(0, list.length);
    while (id == req.body.myid){
        id = randomInt(0, list.length);
    }
    var question = list[id];
    res.render('pages/question', {
        content : question.content,
        id : question.id
    });    
})

Router.get('/:id', (req, res)=> {
    var id = req.params.id;
    var list = getList();
    var question = list[id];
    var yesvalue = 50;
    var novalue = 50;
    if (question.yes + question.no != 0){
        yesvalue = question.yes/(question.yes + question.no)*100;
        yesvalue = yesvalue.toFixed(2);
        novalue = question.no/(question.yes + question.no)*100;
        novalue = novalue.toFixed(2);
    }
    res.render('pages/result', {
        id: question.id,
        content : question.content,
        yesvalue: yesvalue,
        novalue: novalue,
        votenum: question.yes + question.no
    });

})

module.exports = Router;