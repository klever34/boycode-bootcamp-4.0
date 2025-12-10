const exercises = require('../data/exercises');
const generateId = require('../utils/generateId');

exports.getAllExercises = (req, res) => {
    let result = [...exercises]; // Create a mutable copy of the data

    // --- FILTERING ---
    const { category, difficulty, duration, sort, limit, page } = req.query;

    if (category) {
        result = result.filter(ex => ex.category === category);
    }

    if (difficulty) {
        result = result.filter(ex => ex.difficulty === difficulty);
    }

    // Handle duration[lte] query filter
    if (req.query['duration[lte]']) {
         result = result.filter(ex => ex.duration <= Number(req.query['duration[lte]']));
    } else if (duration && duration.lte) {
         result = result.filter(ex => ex.duration <= Number(duration.lte));
    }

    // --- SORTING ---
    if (sort) {
        if (sort === 'duration') {
            result.sort((a, b) => a.duration - b.duration); // Ascending
        } else if (sort === '-duration') {
            result.sort((a, b) => b.duration - a.duration); // Descending
        } else if (sort === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    // --- PAGINATION ---
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || result.length;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedResult = result.slice(startIndex, endIndex);

    res.json({
        count: paginatedResult.length,
        total: result.length,
        data: paginatedResult
    });
};

// BONUS FEATURE: Search Endpoint: /api/exercises/search?q=
exports.searchExercises = (req, res) => {
    const { q } = req.query; // Get the search query 'q'
    
    if (!q) {
        return res.status(400).json({ error: "Search query 'q' is required." });
    }
    
    const query = q.toLowerCase(); // Case-insensitive search

    // Filter exercises where the name OR category includes the query string
    const searchResults = exercises.filter(ex => 
        ex.name.toLowerCase().includes(query) || 
        ex.category.toLowerCase().includes(query)
    );

    res.json({
        count: searchResults.length,
        query: q,
        data: searchResults
    });
};

// GET /api/exercises/:id
exports.getExerciseById = (req, res) => {
    const exercise = exercises.find(ex => ex.id === req.params.id);
    if (!exercise) return res.status(404).json({ error: "Exercise not found" });
    res.json(exercise);
};

// POST /api/exercises
exports.createExercise = (req, res) => {
    const newExercise = {
        id: generateId(),
        ...req.body // The validated body data
    };
    exercises.push(newExercise);
    res.status(201).json(newExercise);
};


// PUT /api/exercises/:id (Replace entire object)
exports.updateExercise = (req, res) => {
    const index = exercises.findIndex(ex => ex.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Exercise not found" });

    // Replace the old object completely, ensuring ID remains the same
    exercises[index] = { 
        id: req.params.id, 
        ...req.body 
    };
    res.json(exercises[index]);
};

// PATCH /api/exercises/:id (Partial update)
exports.patchExercise = (req, res) => {
    const index = exercises.findIndex(ex => ex.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Exercise not found" });

    // Merge existing data with new data from req.body
    exercises[index] = { 
        ...exercises[index], 
        ...req.body 
    };
    res.json(exercises[index]);
};

// DELETE /api/exercises/:id
exports.deleteExercise = (req, res) => {
    const index = exercises.findIndex(ex => ex.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Exercise not found" });

    const deleted = exercises.splice(index, 1); // Remove 1 item at index
    res.json({ message: "Exercise deleted", data: deleted[0] });
};
