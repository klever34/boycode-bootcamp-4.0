module.exports = (req, res, next) => {
  const { title, genre, year, rating } = req.body;

  if (!title || typeof title !== "string")
    return res.status(400).json({ message: "Title is required" });

  if (!genre || typeof genre !== "string")
    return res.status(400).json({ message: "Genre is required" });

  if (!year || typeof year !== "number")
    return res.status(400).json({ message: "Year must be a number" });

  if (rating && (rating < 0 || rating > 5))
    return res.status(422).json({ message: "Rating must be 0–5" });

  next();
};
