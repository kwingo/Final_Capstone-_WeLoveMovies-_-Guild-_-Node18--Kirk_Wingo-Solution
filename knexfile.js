// knexfile.js
require("dotenv").config();

const {
  DATABASE_URL,
  DATABASE_SSL = "true",
} = process.env;

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/your_local_db", // or whatever you use locally
    migrations: { directory: "./src/db/migrations" },
    seeds: { directory: "./src/db/seeds" },
  },

  test: {
    client: "pg",
    connection: "postgres://localhost/your_test_db",
    migrations: { directory: "./src/db/migrations" },
    seeds: { directory: "./src/db/seeds" },
  },

  production: {
    client: "pg",
    connection: DATABASE_URL, // <-- this must be a full, valid URL
    ssl: DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    pool: { min: 2, max: 10 },
    migrations: { directory: "./src/db/migrations" },
    seeds: { directory: "./src/db/seeds" },
  },
};


