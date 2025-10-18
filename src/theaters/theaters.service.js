const knex = require("../db/connection");

function list() {
  return knex("theaters as t")
    .leftJoin("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .leftJoin("movies as m", "mt.movie_id", "m.movie_id")
    .select(
      "t.theater_id",
      "t.name",
      "t.address_line_1",
      "t.address_line_2",
      "t.city",
      "t.state",
      "t.zip",
      "t.created_at as theater_created_at",
      "t.updated_at as theater_updated_at",
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "m.created_at as movie_created_at",
      "m.updated_at as movie_updated_at",
      "mt.is_showing"
    )
    .then((rows) => {
      const byId = new Map();
      for (const row of rows) {
        const tId = row.theater_id;
        if (!byId.has(tId)) {
          byId.set(tId, {
            theater_id: row.theater_id,
            name: row.name,
            address_line_1: row.address_line_1,
            address_line_2: row.address_line_2,
            city: row.city,
            state: row.state,
            zip: row.zip,
            created_at: row.theater_created_at,
            updated_at: row.theater_updated_at,
            movies: [],
          });
        }
        if (row.movie_id) {
          byId.get(tId).movies.push({
            movie_id: row.movie_id,
            title: row.title,
            runtime_in_minutes: row.runtime_in_minutes,
            rating: row.rating,
            description: row.description,
            image_url: row.image_url,
            created_at: row.movie_created_at,
            updated_at: row.movie_updated_at,
            is_showing: !!row.is_showing,
            theater_id: tId,
          });
        }
      }
      return Array.from(byId.values());
    });
}

function listByMovie(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({ "mt.movie_id": movie_id })
    .select(
      "t.theater_id",
      "t.name",
      "t.address_line_1",
      "t.address_line_2",
      "t.city",
      "t.state",
      "t.zip",
      "t.created_at",
      "t.updated_at",
      "mt.is_showing"
    );
}

module.exports = {
  list,
  listByMovie,
};

