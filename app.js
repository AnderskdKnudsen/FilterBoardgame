const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mongoUser = require('./mongo/mongoUser');
const mongoBg = require('./mongo/mongoBg');

const bcrypt = require("bcrypt");
const saltRounds = 10;

var startpage = {
    index: "login.html"
};

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", express.static("public", startpage));
app.use(expressSession({ secret: 'anders' }));

let session;

var server = app.listen(app.get('port'), err => {
    if (err) console.log('Couldn\'t connect on port', app.get('port') + ". Error:", err.stack);
    else console.log('Connected on port', app.get('port'));
});

app.post("/register-user", (req, res) => {
    response = {};

    mongoUser.findOnEmail(req.body).then(data => {
        if (data) {
            response.status = 403;
            response.message = "E-mail already used"
            res.send(response);
        } else {
            bcrypt.hash(req.body.password, saltRounds)
                .then(hashedPassword => {
                    var hashedUser = { "email": req.body.email, "password": hashedPassword };
                    mongoUser.insert(hashedUser)
                        .then(data => {
                            if (data) {
                                response.status = 200;
                                response.message = "Inserted user correctly";
                                response.success = "done";
                                response.email = req.body.email;
                                res.send(response);
                            }
                        });
                }).catch(err => {
                    response.status = 500;
                    response.message = "Something went wrong(crypt)";
                    res.send(response);
                });
        }
    }).catch(err => {
        console.log(err);
    });
});

app.post("/login-user", (req, res) => {
    response = {};
    mongoUser.findOnEmail(req.body).then(data => {
        if (!data) {
            response.status = 403;
            response.message = "Wrong login"
            res.send(response);
        } else if(data) {
            bcrypt.compare(req.body.password, data.password)
                .then(foundDocument => {
                    if(foundDocument) {
                        response.status = 200;
                        response.message = "Successfully logged in"

                        res.send(response);
                    } else {
                        response.status = 404;
                        response.message = "Wrong login"

                        res.send(response);
                    }
                }).catch(err => {
                    console.log("Error comparing", err);
                })
        }
    }).catch(err => {
        console.log("Error finding",err);
    });


});







