const router = require("express").Router();
const controller = require("./movies.controller");
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Mount sub-routers so they can use :movieId
router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);
router.use("/:movieId/theaters", controller.movieExists, theatersRouter);

router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);

router
  .route("/:movieId")
  .get(controller.movieExists, controller.read)
  .all(methodNotAllowed);

module.exports = router;
