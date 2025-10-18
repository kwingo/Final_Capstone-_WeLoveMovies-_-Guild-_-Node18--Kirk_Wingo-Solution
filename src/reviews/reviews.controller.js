const service = require("./reviews.service");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

async function list(req, res, next) {
  const { movieId } = req.params;
  const data = await service.list(movieId); // expects critic nested per spec
  res.json({ data });
}

async function destroy(req, res, next) {
  await service.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const { review } = res.locals;
  const updatedReview = {
    ...req.body.data,
    review_id: review.review_id,
  };

  await service.update(updatedReview);

  const data = await service.readWithCritic(review.review_id);
  res.json({ data });
}

module.exports = {
  list: [list],
  delete: [reviewExists, destroy],
  update: [reviewExists, update],
  reviewExists: [reviewExists],
};

