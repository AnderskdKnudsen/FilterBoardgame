const mongo = require('mongodb').MongoClient;

let path = 'mongodb://localhost:27017/FilterBoardgame';

module.exports = {
    insert: function(boardgame){
        mongo.connect(path, (err, db) => {
            if (err) console.log('Error connecting to the database', err.stack)
            else {
                let collection = db.collection("boardgames");

                collection.insertOne(boardgame, (err, result) => {
                    if (err) console.log("Error inserting in database", err.stack);
                    else {
                        console.log("inserted:", boardgame);
                        db.close();
                    }
                });
            }
        });
    }
    
}