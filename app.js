const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server = app.listen(app.get('port'), err => {
    if(err) console.log('Couldn\'t connect on port', app.get('port') + ". Error:", err.stack);
    else console.log('Connected on port', app.get('port'));
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});
