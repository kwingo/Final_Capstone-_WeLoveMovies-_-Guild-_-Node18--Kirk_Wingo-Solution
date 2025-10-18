const service = require("./movies.service");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function list(req, res, next) {
  const { is_showing } = req.query;
  const data = is_showing ? await service.listShowing() : await service.list();
  res.json({ data });
}

function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list,
  read,
  movieExists, 
};
