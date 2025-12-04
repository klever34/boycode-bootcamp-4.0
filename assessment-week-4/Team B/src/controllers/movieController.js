let movies = require('../data/movies');
const applyQueryFilters = require('../utils/queryFilter'); 
const generateId = require('../utils/generateId'); 

const getAllMovies = (req, res) => {
    const result = applyQueryFilters(movies, req.query);
    
    if (result.error) {
        return res.status(400).json({ message: result.error });
    }
    res.json(result);
};

const getTopRatedMovies = (req, res) => {
    const threshold = parseFloat(req.query.min_rating) || 4.5;
    
    const topMovies = movies.filter(m => m.rating && m.rating >= threshold);
    
    res.json(topMovies);
};
    
const getMovieById = (req, res) => { 
    const id = parseInt(req.params.id);
    const movie = movies.find(m => m.id === id);
    if (movie) {
        res.json(movie);
    } else {    
        res.status(404).json({ message: 'Movie not found' });
    }
};

const createMovie = (req, res) => {
    const newId = generateId();
    const newMovie = {
        id: newId, 
        ...req.body
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
};

const updateMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex(m => m.id === id);

    if (index !== -1) {
        const updatedMovie = { id, ...req.body };
        movies[index] = updatedMovie;
        res.json(updatedMovie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
};

const patchMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex(m => m.id === id);

    if (index !== -1) {
        movies[index] = { ...movies[index], ...req.body };
        res.json(movies[index]);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    };
};

const deleteMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = movies.length;

    movies = movies.filter(m => m.id !== id);

    if (movies.length < initialLength) {
        res.status(204).send();
    }  else {
        res.status(404).json({ message: 'Movie not found' });
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    patchMovie,
    deleteMovie,
    
    getTopRatedMovies
};