const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const validateReview = require('../middleware/validateReview');

router.get('/:movieId', reviewController.getReviewsByMovie);
router.post('/', validateReview, reviewController.createReview);
router.get('/:id', reviewController.getReviewById);
router.delete('/:id', reviewController.deleteReview)

module.export = router;