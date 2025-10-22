// src/db/seeds/00-cleanup.js
exports.seed = async function (knex) {
  const isSqlite = knex.client.config.client === "sqlite3";
  const hasTable = (t) => knex.schema.hasTable(t);

  if (isSqlite) await knex.raw("PRAGMA foreign_keys = OFF");

  // Delete children -> parents
  if (await hasTable("movies_theaters")) await knex("movies_theaters").del();
  if (await hasTable("reviews")) await knex("reviews").del();
  if (await hasTable("critics")) await knex("critics").del();
  if (await hasTable("theaters")) await knex("theaters").del();
  if (await hasTable("movies")) await knex("movies").del();

  if (isSqlite) await knex.raw("PRAGMA foreign_keys = ON");
};
