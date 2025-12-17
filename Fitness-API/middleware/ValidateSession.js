const exercises = require('../data/exercises');

const validateSession = (req, res, next) => {
    const { exerciseId, reps, sets } = req.body;

    // 1. Check if exerciseId references an existing exercise
    const exerciseExists = exercises.find(ex => ex.id === exerciseId);
    if (!exerciseExists) {
        return res.status(400).json({ error: "exerciseId must reference an existing exercise" });
    }

    if (reps === undefined || typeof reps !== 'number') {
        return res.status(400).json({ error: "Reps must be a number" });
    }

    if (sets === undefined || typeof sets !== 'number') {
        return res.status(400).json({ error: "Sets must be a number" });
    }

    next();
};

module.exports = validateSession;
