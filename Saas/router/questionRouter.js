const express = require('express');
const Router = express.Router();
const fileCtrl = require("../Controller/fileController");
const filePath = "./questions.json";
const askCtrl = require('../Controller/questionController');


function randomInt(min, max){
    return Math.floor(Math.random()*(max - min)) + min;
}

Router.get('/', (req, res)=>{
    var list = [];
    askCtrl.getQuestlist((err, Qlist)=>{
        if(err) console.log(err);
        else list = Qlist;
        if (list.length == 0){
            res.render('pages/ask', {message: "No question found, be the first one to ask!"});
        }
        var id = randomInt(0, list.length);
        var question = list[id];
        res.render('pages/question', {
            content : question.content,
            id : question._id
        });    
    });
   

})

Router.post('/other', (req, res)=>{
  
   

})

Router.post('/', (req, res) =>{
    if (req.body.answer === "") {
        var list = [];
        askCtrl.getQuestlist((err, Qlist)=>{
            if(err) console.log(err);
            else list = Qlist;
            if (list.length == 0){
                res.render('pages/ask', {message: "No question found, be the first one to ask!"});
            }
            var id = randomInt(0, list.length);
            var question = list[id];
            if(req.body.myid && list.length>1) {
                while (question._id == req.body.myid){
                    id = randomInt(0, list.length);
                    question = list[id];
                    console.log(question);
                }
            }
            res.render('pages/question', {
                content : question.content,
                id : question._id
            });    
        });
    }
    askCtrl.updateQuest(req.body.myid, req.body.answer, (err, quest) =>{
        if (err) console.log(err);
        else {
            res.redirect(`/question/${req.body.myid}`);
        }
    });
})

Router.get('/:id', (req, res)=> {
    var id = req.params.id;
    
    var yesvalue = 50;
    var novalue = 50;
    askCtrl.getQuestionbyId(id, (err, quest) =>{
        if (err) console.log(err);
        else {
            var question = quest;
            if (question.yes + question.no != 0){
                yesvalue = question.yes/(question.yes + question.no)*100;
                yesvalue = yesvalue.toFixed(2);
                novalue = question.no/(question.yes + question.no)*100;
                novalue = novalue.toFixed(2);
            }
            res.render('pages/result', {
                id: question._id,
                content : question.content,
                yesvalue: yesvalue,
                novalue: novalue,
                votenum: question.yes + question.no
            });
        }
    });


})

module.exports = Router;