const express = require('express');
const app = express();
const config = require('./config.json');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const askRouter = require('./askRouter');

app.use(bodyParser.urlencoded({ extended: true }))
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/Contents'));
app.get('/', (req, res)=>{
    res.render('index', {
        layout: "other",
        variable: "<h1>Hello<h1>"
    })
})
app.use('/ask', askRouter);
app.get('/about', (req, res)=> {
   
})
/*app.get('/style.css', (req, res)=> {
    res.sendFile(__dirname + '/public/index.html');
})*/
app.listen(config.port, (err)=> {
    console.log(err);
    console.log(`App is listening at port  ${config.port}`);
})

