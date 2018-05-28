
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id').primary;
            table.string('email').unique;
            table.string('password');
        })
        .creatTable('genres', table => {
            table.increments('id').primary;
            table.string('genre').unique;
        })
        .createTable('boardgames', table => {
            table.increments('id').primary;
            table.string('title').unique;
            table.integer('min_players').unsigned();
            table.integer('max_players').unsigned();
            table.integer('fk_genre').references('id').inTable('genres');
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('boardgames')
        .dropTable('genres')
        .dropTable('users');
};
