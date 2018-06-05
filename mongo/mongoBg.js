const mongo = require('mongodb').MongoClient;

let path = 'mongodb://localhost:27017/FilterBoardgame';

function search(boardgame) {
    return new Promise((resolve, reject) => {
        mongo.connect(path, (err, db) => {
            if (err) {
                reject(err.stack);
                return;
            }
            db.collection("boardgames").find({
                minplayers: { $lte: parseInt(boardgame.minplayers, 10) },
                maxplayers: { $gte: parseInt(boardgame.maxplayers, 10) },
                genre: boardgame.genre,
                playingtime: { $lte: parseInt(boardgame.time, 10) }

            }).toArray((err, games) => {
                if (err) {
                    reject(err.stack)
                    return;
                }
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

            let boardgameToInsert = {
                title: boardgame.title,
                minplayers: parseInt(boardgame.minplayers, 10),
                maxplayers: parseInt(boardgame.maxplayers, 10),
                genre: [boardgame.genre, "either"],
                playingtime: parseInt(boardgame.playingtime, 10)
            };

            db.collection("boardgames").insertOne(boardgameToInsert, (err, result) => {
                if(err) {
                    reject(err.stack);
                    return;
                }
                resolve(true);
                db.close();
            });
        });
    });
}

function searchOnTitle(boardgame) {
    return new Promise((resolve, reject) => {
        mongo.connect(path, (err, db) => {
            if (err) {
                reject(err.stack);
                return;
            }
            db.collection("boardgames").find({title: boardgame.title})
            .toArray((err, game) => {
                resolve(game);
            });
        });
    });
}

module.exports.searchOnTitle = searchOnTitle;
module.exports.insert = insert;
module.exports.search = search;