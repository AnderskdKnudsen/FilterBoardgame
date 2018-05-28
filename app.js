const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mongoUser = require('./mongo/mongoUser');
const mongoBg = require('./mongo/mongoBg');
const expressSession = require('express-session');

const bcrypt = require("bcrypt");
const saltRounds = 10;

var startpage = {
    index: "login.html"
};

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", express.static("public", startpage));

let session;

var server = app.listen(app.get('port'), err => {
    if (err) console.log('Couldn\'t connect on port', app.get('port') + ". Error:", err.stack);
    else console.log('Connected on port', app.get('port'));
});

/*
TODO
Setup clientside javascript for login and register! 
REMEMBER SESSIONS! validated: true if you're succesfully logged in. 
Check on validated for every api endpoint. (Session). If false redirect to error page, which redirects back to login or register
*/





