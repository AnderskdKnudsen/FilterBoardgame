const mongo = require('mongodb').MongoClient;

let path = 'mongodb://localhost:27017/FilterBoardgame';

function search(boardgame) {
    return new Promise((resolve, reject) => {
        mongo.connect(path, (err, db) => {
            if (err) {
                reject(err.stack);
                return
            }
            db.collection("boardgames").find({
                minplayers: { $lte: parseInt(boardgame.minplayers, 10) },
                maxplayers: { $gte: parseInt(boardgame.maxplayers, 10) },
                genre: boardgame.genre,
                playingtime: { $lte: parseInt(boardgame.time, 10) }

            }).toArray((err, games) => {
                resolve(games);
                db.close();
            });

        });
    });
}

function insert(boardgame) {
    return new Promise((resolve, reject) => {
        mongo.connect(path, (err, db) => {
            if (err) {
                reject(err.stack);
                return;
            }
            db.collection("boardgames").insertOne(boardgame, (err, result) => {
                if(err) {
                    reject(err.stack);
                    return;
                }
                resolve(result);
                db.close();
            });
        });
    });
}

module.exports.insert = insert;
module.exports.search = search;