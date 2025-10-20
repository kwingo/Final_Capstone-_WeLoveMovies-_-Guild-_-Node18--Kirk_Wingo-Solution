
const { PORT = 5001 } = process.env;
const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then(() => knex.seed.run())
  .then(() => app.listen(PORT, listener))
  .catch((err) => {
    console.error("Migration/seed failed:", err);
    process.exit(1);
  });

