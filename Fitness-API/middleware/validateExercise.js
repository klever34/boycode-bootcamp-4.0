const validateExercise = (req, res, next) => {
  const { name, category, difficulty, duration } = req.body;

  if (!name) return res.status(400).json({ message: "name is required" });

  const allowedCat = ["strength", "cardio", "flexibility"];
  if (!allowedCat.includes(category))
    return res.status(422).json({ message: "category must be: strength, cardio, flexibility" });

  const allowedDiff = ["easy", "medium", "hard"];
  if (!allowedDiff.includes(difficulty))
    return res.status(422).json({ message: "difficulty must be: easy, medium, hard" });

  if (typeof duration !== "number" || duration <= 0)
    return res.status(422).json({ message: "duration must be a number greater than 0" });

  next();
};

module.exports = validateExercise;

