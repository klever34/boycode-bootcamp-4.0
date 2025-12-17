const sessions = require('../data/sessions');
const generateId = require('../utils/generateId');

// GET /api/sessions
exports.getAllSessions = (req, res) => {
    res.json(sessions);
};

// GET /api/sessions/:id
exports.getSessionById = (req, res) => {
    const session = sessions.find(s => s.id === req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
};

// POST /api/sessions
exports.createSession = (req, res) => {
    const newSession = {
        id: generateId(),
        exerciseId: req.body.exerciseId,
        reps: req.body.reps,
        sets: req.body.sets,
        notes: req.body.notes || ""
    };
    sessions.push(newSession);
    res.status(201).json(newSession);
};

// DELETE /api/sessions/:id
exports.deleteSession = (req, res) => {
    const index = sessions.findIndex(s => s.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Session not found" });

    sessions.splice(index, 1);
    res.status(204).send(); // 204 No Content is standard for delete
};
