const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const bcrypt = require("bcrypt");
const saltRounds = 10;

var startPage = {
    index: "login.html"
};

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", express.static("public", startPage));


var server = app.listen(app.get('port'), err => {
    if (err) console.log('Couldn\'t connect on port', app.get('port') + ". Error:", err.stack);
    else console.log('Connected on port', app.get('port'));
});

app.get('/', (req, res) => {
    res.sendFile('login.html');
});
