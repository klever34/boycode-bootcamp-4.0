const exercises = require("../data/exercises");
const sessions = require("../data/sessions");

// Sessions controller — sessions reference exercises by exerciseId
exports.getAll = (req, res) => res.json(sessions);

exports.getOne = (req, res) => {
  const item = sessions.find(x => x.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

// Create a session only if referenced exercise exists
exports.create = (req, res) => {
  const exists = exercises.find(x => x.id === req.body.exerciseId);
  if (!exists) return res.status(400).json({ message: "Invalid exerciseId" });

  const newItem = { id: Date.now().toString(), ...req.body };
  sessions.push(newItem);
  res.status(201).json(newItem);
};

// Delete a session by id
exports.delete = (req, res) => {
  const index = sessions.findIndex(x => x.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  sessions.splice(index, 1);
  res.json({ message: "Deleted" });
};
