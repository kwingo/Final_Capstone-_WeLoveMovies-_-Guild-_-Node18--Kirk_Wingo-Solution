const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://localhost/we_love_movies",
    migrations: { directory: path.join(__dirname, "src", "db", "migrations") },
    seeds: { directory: path.join(__dirname, "src", "db", "seeds") },
  },
  test: {
    client: "sqlite3",
    connection: { filename: ":memory:" },
    useNullAsDefault: true,
    migrations: { directory: path.join(__dirname, "src", "db", "migrations") },
    seeds: { directory: path.join(__dirname, "src", "db", "seeds") },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: { directory: path.join(__dirname, "src", "db", "migrations") },
    seeds: { directory: path.join(__dirname, "src", "db", "seeds") },
  },
};
