const express = require("express");
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const alert = require('alert'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/public", express.static(__dirname + "/public"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

let message = {
    text: '',
    class: ''
};

app.get('/', (req, res, next)=>{
    res.render('main', {errorMsg: message.text, errorClass: message.class});
});

app.post('/', (req, res, next)=>{
    message.text = '';
    message.class= '';
    let emailInput = req.body.email;
    if(!emailInput){
        message.text = 'Whoops! It looks like you forgot to add your email.';
        message.class= 'error-input';
    } else {
        if (emailInput.match(/@gmail./)== null && emailInput.match(/@hotmail./)== null && emailInput.match(/@yahoo./)== null){
            message.text = 'Please provide a valid email address';
            message.class= 'error-input';
        } else {
                alert('Your email is sent! Thank you!');
        }
    }
    res.render('main', {errorMsg: message.text, errorClass: message.class});
}); 

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;