// src/db/seeds/00-cleanup.js
exports.seed = async function (knex) {
  const isSqlite = knex.client.config.client === "sqlite3";
  if (isSqlite) await knex.raw("PRAGMA foreign_keys = OFF");

  // Clear in dependency order: junctions/children -> parents
  await knex("movies_theaters").del();
  await knex("reviews").del();
  await knex("critics").del();
  await knex("theaters").del();
  await knex("movies").del();

  if (isSqlite) await knex.raw("PRAGMA foreign_keys = ON");
};
