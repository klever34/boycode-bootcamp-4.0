const movies = require("../data/movies");

module.exports = (req, res, next) => {
  const { movieId } = req.params;
  const { reviewer, comment, stars } = req.body;

  const errors = [];

  const movieExists = movies.find(m => m.id === Number(movieId));
  if (!movieExists) errors.push("movieId does not refer to an existing movie");

  if (!reviewer) errors.push("reviewer is required");
  if (!comment) errors.push("comment is required");

  const s = Number(stars);
  if (stars === undefined || isNaN(s) || s < 1 || s > 5)
    errors.push("stars must be between 1 and 5");

  if (errors.length) return res.status(422).json({ message: "Validation failed", errors });

  next();
};
