module.exports = {
  up: function (knex) {
    return knex.schema.createTable("reviews", (t) => {
      t.increments("review_id").primary();
      t.text("content");
      t.integer("score");
      t
        .integer("critic_id")
        .unsigned()
        .references("critic_id")
        .inTable("critics")
        .onDelete("CASCADE");
      t
        .integer("movie_id")
        .unsigned()
        .references("movie_id")
        .inTable("movies")
        .onDelete("CASCADE");
      t.timestamps(true, true);
    });
  },

  down: function (knex) {
    return knex.schema.dropTableIfExists("reviews");
  },
};
