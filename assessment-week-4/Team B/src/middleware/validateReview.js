const movies = require("../data/movies");

module.exports = (req, res, next) => {
  const movieId = parseInt(req.params.movieId);
  const { reviewer, comment, stars } = req.body;

  if (!movies.some(m => m.id === movieId))
    return res.status(400).json({ message: "Movie ID does not exist" });

  if (!reviewer)
    return res.status(400).json({ message: "Reviewer required" });

  if (!comment)
    return res.status(400).json({ message: "Comment required" });

  if (!stars || stars < 1 || stars > 5)
    return res.status(422).json({ message: "Stars must be 1–5" });

  next();
};
