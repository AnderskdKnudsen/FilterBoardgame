const Model = require('boardgames').Model;

class Boardgame extends Model {
    static get tableName() {
        return 'boardgames';
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ['title', 'min_players', 'max_players'],

            properties: {
                id: {type: 'integer'},
                title: {type: 'string', minLength: 1, maxLength: 255},
                min_players: {type: 'integer'},
                max_players: {type: 'integer'},
                genre: {type: 'string'}
            }
        }
    }
}

module.exports = Boardgame;