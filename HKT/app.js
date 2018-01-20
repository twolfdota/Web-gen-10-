const express = require('express');
const app = express();
const config = require('./config.json');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const acCtrl = require('./Controller/ACController');

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

mongoose.connect(config.dbUrl, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connect success!");
    }
})


app.use(express.static('./Contents'));

app.get('/', (req, res) => {
    res.render('pages/index');
})

app.post('/', (req, res) => {
    console.log(req.body.name);
    acCtrl.addAC(req.body.name,req.body.image, (err, id) => {
        if (err) {
            console.log(err);
        } else {
            console.log(id);
        }
    });


    res.render("pages/index", { message: "Your question have been sent!" });

});

app.get('/autocomplete/:search', (req, res) => {
    acCtrl.autoComp(req.params.search, (err, list)=> {
        if(err) {
            console.log(err);
        } else {
            console.log(list);
        }
        res.send(list);
    });
})

app.listen(config.port, (err) => {
    console.log(err);
    console.log(`App is listening at port  ${config.port}`);
})