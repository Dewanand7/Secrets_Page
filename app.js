//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
const port = 3000;



app.use(express.static('public'));    // eslint-disable-line no-unused-vars   no  strict-importants   no-unused-expressionSyntax  errors
app.set('view engine', 'ejs');        // eslint-disable-line no-unused-vars no-unused-expressionSyntax errors
app.use(bodyParser.urlencoded({extended: true}));         // eslint-disable-line no-unused-vars   no-unused-expressionSyntax Errors

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});              // eslint-disable-line no-unused-vars no-unused-expressionSyntax errorsMap
const userSchema = {
    email:String,
    password:String
};

const user = new mongoose.model('user',userSchema)
//gggg


app.get('/', (req, res) => {
    res.render('home')
});

app.get('/login', (req, res) => {    
    res.render('login')
});

app.get('/register', (req, res) => {    
        res.render('register')
    });


app.post('/register', (req, res) => {
    const newUser = new user({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save((err) => {
       if (err) {
        console.log(err); 
       }else {
        res.render('Secrets');
        
       }
    });
});




    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      });