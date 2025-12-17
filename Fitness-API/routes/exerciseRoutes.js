const express = require('express');
const router = express.Router();
const controller = require('../controllers/exerciseController');
const validateExercise = require('../middleware/validateExercise');

// BONUS FEATURE: Search Endpoint
router.get('/search', controller.searchExercises); 

// GET All Exercises (Handles Filtering, Sorting, Pagination)
router.get('/', controller.getAllExercises);

router.get('/:id', controller.getExerciseById);
router.post('/', validateExercise, controller.createExercise);
router.put('/:id', validateExercise, controller.updateExercise);
router.patch('/:id', controller.patchExercise); 
router.delete('/:id', controller.deleteExercise);

module.exports = router;
