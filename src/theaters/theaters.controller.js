const service = require("./theaters.service");

async function list(req, res, next) {
  const { movieId } = req.params;

  if (movieId) {
    const data = await service.listByMovie(movieId);
    return res.json({ data });
  }

  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list,
};
