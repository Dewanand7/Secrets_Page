//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const app = express();
const port = 3000;

console.log(process.env.API_KEY);



app.use(express.static('public'));    // eslint-disable-line no-unused-vars   no  strict-importants   no-unused-expressionSyntax  errors
app.set('view engine', 'ejs');        // eslint-disable-line no-unused-vars no-unused-expressionSyntax errors
app.use(bodyParser.urlencoded({extended: true}));         // eslint-disable-line no-unused-vars   no-unused-expressionSyntax Errors

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});              // eslint-disable-line no-unused-vars no-unused-expressionSyntax errorsMap
const userSchema = new mongoose.Schema({ 
    email: String ,
    password: String
});


userSchema.plugin(encrypt,{ secret: secret , encryptedFields: ['password'] });

const User = new mongoose.model('User',userSchema)
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
    const newUser = new User({
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

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

   User.findOne({ email: username}, (err, foundUser) => {
           if (err) {
               console.log(err);
           } else {
               if (foundUser) {
                   if (foundUser.password === password) {
                       res.render('secrets');
                   }
               }
           }
       })
})
// kucha error hai login page main kaam nai kar rha hai. new credentials add karne par wo bhi check karna pade ga.

//database main authentication add kiye ab tak NEXT mkv start hoga 006_using Environment variables to keep safe.


    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      });