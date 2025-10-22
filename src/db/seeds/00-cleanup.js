// src/db/seeds/00-cleanup.js
exports.seed = async (knex) => {
  const isSqlite = knex.client.config.client === "sqlite3";
  if (isSqlite) await knex.raw("PRAGMA foreign_keys = OFF");

  for (const t of ["movies_theaters", "reviews", "critics", "theaters", "movies"]) {
    const exists = await knex.schema.hasTable(t);
    if (exists) await knex(t).del();
  }

  if (isSqlite) await knex.raw("PRAGMA foreign_keys = ON");
};
