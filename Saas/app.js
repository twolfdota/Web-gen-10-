const express = require('express');
const app = express();
const config = require('./config.json');
const askRouter = require('./askRouter');
const questionRouter = require('./questionRouter');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/Contents'));
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

