const reviews = require("../data/reviews");
const movies  = require("../data/movies");
const { generateId } = require("../utils/generateId");

// GET /api/movies/:movieId/reviews
exports.getMovieReviews = (req, res) => {
  const movieId = Number(req.params.movieId);

  const movie = movies.find(m => m.id === movieId);
  if (!movie) return res.status(404).json({ message: "Movie not found" });

  const movieReviews = reviews.filter(r => r.movieId === movieId);
  res.json(movieReviews);
};

// GET /api/reviews/:id
exports.getReview = (req, res) => {
  const review = reviews.find(r => r.id == req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });
  res.json(review);
};

// POST /api/movies/:movieId/reviews
exports.createReview = (req, res) => {
  const { reviewer, comment, stars } = req.body;

  const newReview = {
    id: generateId(reviews),
    movieId: Number(req.params.movieId),
    reviewer,
    comment,
    stars
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
};

// DELETE /api/reviews/:id
exports.deleteReview = (req, res) => {
  const index = reviews.findIndex(r => r.id == req.params.id);

  if (index === -1) return res.status(404).json({ message: "Review not found" });

  const deleted = reviews.splice(index, 1)[0];
  res.json({ message: "Review deleted", deleted });
};
qjy-akyf-bua
