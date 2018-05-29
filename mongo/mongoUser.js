const mongo = require('mongodb').MongoClient;

let path = 'mongodb://localhost:27017/FilterBoardgame';

function insert(user) {
    return new Promise((resolve, reject) => {
        mongo.connect(path, (err, db) => {
            if (err) {
                reject(err.stack);
            }
            db.collection("users").insertOne(user, (err, result) => {
                if (err) {
                    reject(err.stack);
                } else {
                    db.close();
                    resolve(true);
                }
            });
        });
    });
}

function find(user) {
    return new Promise((resolve, reject) => {
        mongo.connect(path, (err, db) => {
            if (err) {
                reject(err.stack);
            }
            db.collection("users").findOne({ "email": user.email }, (err, result) => {
                if (err) {
                    reject(err.stack);
                } else {
                    db.close();
                    resolve(result);
                }
            });
        });
    });
}

module.exports.find = find;
module.exports.insert = insert;
