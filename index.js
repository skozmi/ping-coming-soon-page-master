const express = require("express");
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/public", express.static(__dirname + "/public"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res, next)=>{
    res.sendFile(__dirname + '/public/index.html');
});

/*
app.get('/', (req, res, next)=>{
    res.render('main');
});


app.post('/', (req, res, next)=>{
    message = {
        error: {text:'', class:''},
        success: {text: ''}
    };
    let emailInput = req.body.email;
    if(!emailInput || emailInput.match(/@/) == null || emailInput.match(/.com/) == null){
        message.error.text = 'Please provide a valid email';
        message.error.class = 'error-input'
    }
    else {
        message.success.text = 'Thank you for login in';
    }
    res.render('main', {errorMsg: message.error.text, errorIcon: message.error.class, successMsg: message.success.text});
}); */

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;