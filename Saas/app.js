const express = require('express');
const app = express();
const config = require('./config.json');

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
app.listen(config.port, (err)=> {
    console.log(err);
    console.log(`App is listening at port  ${config.port}`);
})

