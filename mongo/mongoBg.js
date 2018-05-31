const mongo = require('mongodb').MongoClient;

let path = 'mongodb://localhost:27017/FilterBoardgame';

function search(boardgame) {
    return new Promise((resolve, reject) => {
        mongo.connect(path, (err, db) => {
            if (err) {
                reject(err.stack);
            }
            db.collection("boardgames").find({
                minplayers: { $lte: parseInt(boardgame.minplayers, 10) },
                maxplayers: { $gte: parseInt(boardgame.maxplayers, 10) },
                genre: boardgame.genre,
                playingtime: { $lte: parseInt(boardgame.time, 10)}

            }).toArray((err, games) => {
                resolve(games);
            });

        });
    });
}

module.exports.search = search;