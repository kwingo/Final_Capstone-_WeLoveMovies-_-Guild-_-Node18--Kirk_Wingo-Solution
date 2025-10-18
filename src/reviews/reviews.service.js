// src/reviews/reviews.service.js
const knex = require("../db/connection");

function list(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.movie_id",
      "r.critic_id",
      "r.created_at as review_created_at",
      "r.updated_at as review_updated_at",
      "c.critic_id as c_critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    )
    .where({ "r.movie_id": movie_id })
    .then((rows) =>
      rows.map((row) => ({
        review_id: row.review_id,
        content: row.content,
        score: row.score,
        movie_id: row.movie_id,
        critic_id: row.critic_id,
        created_at: row.review_created_at,
        updated_at: row.review_updated_at,
        critic: {
          critic_id: row.c_critic_id,
          preferred_name: row.preferred_name,
          surname: row.surname,
          organization_name: row.organization_name,
          created_at: row.critic_created_at,
          updated_at: row.critic_updated_at,
        },
      }))
    );
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

async function update(updatedReview) {
  await knex("reviews").where({ review_id: updatedReview.review_id }).update({
    content: updatedReview.content,
    score: updatedReview.score,
    critic_id: updatedReview.critic_id,
    movie_id: updatedReview.movie_id,
    updated_at: knex.fn.now(),
  });
}

function readWithCritic(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.movie_id",
      "r.critic_id",
      "r.created_at as review_created_at",
      "r.updated_at as review_updated_at",
      "c.critic_id as c_critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    )
    .where({ "r.review_id": review_id })
    .first()
    .then((row) =>
      row && {
        review_id: row.review_id,
        content: row.content,
        score: row.score,
        movie_id: row.movie_id,
        critic_id: row.critic_id,
        created_at: row.review_created_at,
        updated_at: row.review_updated_at,
        critic: {
          critic_id: row.c_critic_id,
          preferred_name: row.preferred_name,
          surname: row.surname,
          organization_name: row.organization_name,
          created_at: row.critic_created_at,
          updated_at: row.critic_updated_at,
        },
      }
    );
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  list,
  read,
  update,
  readWithCritic,
  destroy,
};
