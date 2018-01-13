const express = require('express');
const app = express();
const config = require('./config.json');
const askRouter = require('./router/askRouter');
const questionRouter = require('./router/questionRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/Contents'));
mongoose.connect("mongodb://localhost:27017/my1stDB", (err)=>{
    if(err){
        console.log(err);
    } else {
        console.log("Database connect success!");
    }
})
askRouter.use(express.static(__dirname + '/Contents'));
questionRouter.use(express.static(__dirname + '/Contents'));
app.get('/', (req, res)=>{
    res.render('pages/index');
})

app.get('/about', (req, res)=> {
    res.render('pages/about');
})
/*app.get('/style.css', (req, res)=> {
    res.sendFile(__dirname + '/public/index.html');
})*/
app.use('/ask', askRouter);
app.use('/question', questionRouter);

app.listen(config.port, (err)=> {
    console.log(err);
    console.log(`App is listening at port  ${config.port}`);
})

