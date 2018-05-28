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

//Objection and knex setup
const objection = require("objection");
const Model = objection.Model;
const Knex = require("knex");
const knexConfig = require("./knexfile.js");
const knex = Knex(knexConfig.development);

Model.knex(knex);

const db = {
    "Knex": knex,
    "User": require("./models/User.js")
}

