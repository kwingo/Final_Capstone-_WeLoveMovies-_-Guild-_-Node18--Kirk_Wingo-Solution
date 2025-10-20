if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

const app = express();
app.use(cors());
app.use(express.json());

// Health and root 
app.get("/healthz", (_req, res) => res.status(200).send("ok"));
app.get("/", (_req, res) => {
  res.json({
    service: "WeLoveMovies API",
    status: "ok",
    endpoints: ["/movies", "/theaters", "/reviews", "/healthz"],
  });
});

 // Routes
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// 404 handler
app.use((req, res, next) => {
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
});

// Error handler
app.use((err, req, res, _next) => {
  const { status = 500, message = "Something went wrong!" } = err || {};
  res.status(status).json({ error: message });
});

module.exports = app;


