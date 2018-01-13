const QuestionSchema = require("../model/questionModel");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/my1stDB";

const addQuestion = (content, callback) => {
    QuestionSchema.create({content}, (err, res)=>{
        if (err){
            callback(err, null);
        } else {
            callback(null, res._id);
        }
    });
};
const getQuestionbyId = (id, callback) => {
    QuestionSchema.findById(id, (err, res)=> {
        if(err){
            callback(err, null);
        } else {
            callback(null, res);
        }
    })
}
const getQuestlist = (callback) => { 
    QuestionSchema.find({},(err,res)=>{
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    })
};

const updateQuest = (id, answer, callback) => {
    if(answer === "yes"){
        QuestionSchema.findOneAndUpdate({_id: id}, {$inc: { yes : 1}}, (err, res)=>{
            if (err) {
                callback(err, null);
            } else {
                callback(null, res);
            }
        });
    }
    if(answer === "no"){
        QuestionSchema.findOneAndUpdate({_id: id}, {$inc: { no : 1}}, (err, res)=>{
            if(err) {
                callback(err, null);
            } else {
                callback(null, res);
            }
        });
    }
}
module.exports = {
    addQuestion: addQuestion,
    getQuestlist: getQuestlist,
    getQuestionbyId: getQuestionbyId,
    updateQuest: updateQuest
}