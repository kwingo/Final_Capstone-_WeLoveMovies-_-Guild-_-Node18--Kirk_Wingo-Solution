require("dotenv").config();

const { DATABASE_URL, DATABASE_SSL = "true" } = process.env;

module.exports = {
  development: { prefer.
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
      connectionString: DATABASE_URL, 
      ssl: DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    },
    pool: { min: 0, max: 10 },
    migrations: { directory: "src/db/migrations" },
    seeds: { directory: "src/db/seeds" },
  },
};
If you insist on local Postgres instead of SQLite, change the development block to:

js
Copy code
development: {
  client: "pg",
  connection: {
    connectionString: process.env.DEV_DATABASE_URL || "postgres://localhost:5432/welovemovies_dev",
    ssl: false,
  },
  migrations: { directory: "./src/db/migrations" },
  seeds: { directory: "./src/db/seeds" },
},


