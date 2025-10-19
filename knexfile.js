require("dotenv").config();

const { DATABASE_URL, DATABASE_SSL = "true" } = process.env;

module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./src/db/dev.sqlite3" },
    useNullAsDefault: true,
    migrations: { directory: "./src/db/migrations" },
    seeds: { directory: "./src/db/seeds" },
  },

  test: {
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
    migrations: { directory: "./src/db/migrations" },
    seeds: { directory: "./src/db/seeds" },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URL, // set this in Render
      ssl: DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    },
    pool: { min: 0, max: 10 },
    migrations: { directory: "src/db/migrations" },
    seeds: { directory: "src/db/seeds" },
  },
};



