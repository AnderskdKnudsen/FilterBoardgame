const mongo = require('mongodb').MongoClient;

let path = 'mongodb://localhost:27017/FilterBoardgame';

function search(boardgame) {
    return new Promise((resolve, reject) => {
        mongo.connect(path, (err, db) => {
            if (err) {
                reject(err.stack);
            }
            db.collection("boardgames").find({ 
                minplayers: { $gte: boardgame.minplayers },
                maxplayers: { $gte: boardgame.maxplayers },
                genre: boardgame.genre,
                time: { $gte: boardgame.time}
            }).toArray((err, games) => {
                resolve(games);
            });

        });
    });
}

module.exports.search = search;