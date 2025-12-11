const exercises = require("../data/exercises");

exports.getAll = (req, res) => {
  let result = [...exercises];

  if (req.query.category)
    result = result.filter(x => x.category === req.query.category);

  if (req.query.difficulty)
    result = result.filter(x => x.difficulty === req.query.difficulty);

  if (req.query.duration)
    if (req.query.duration.lte)
      result = result.filter(x => x.duration <= Number(req.query.duration.lte));

  if (req.query.sort)
    result.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? 1 : -1));

  // simple pagination
  const limit = Number(req.query.limit) || result.length;
  const page = Number(req.query.page) || 1;
  const start = (page - 1) * limit;

  res.json(result.slice(start, start + limit));
};

exports.getOne = (req, res) => {
  const item = exercises.find(x => x.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

exports.create = (req, res) => {
  const newItem = { id: Date.now().toString(), ...req.body };
  exercises.push(newItem);
  res.status(201).json(newItem);
};

exports.update = (req, res) => {
  const index = exercises.findIndex(x => x.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  exercises[index] = { ...exercises[index], ...req.body };
  res.json(exercises[index]);
};

exports.delete = (req, res) => {
  const index = exercises.findIndex(x => x.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  exercises.splice(index, 1);
  res.json({ message: "Deleted" });
};
