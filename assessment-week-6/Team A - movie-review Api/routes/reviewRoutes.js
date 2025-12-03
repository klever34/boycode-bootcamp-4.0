const expess = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const validateReview = require('../middleware/validateReview');

router.get('/:movieId', reviewController.getReviewsByMovie);
router.post('/', validateReview, reviewController.createReview);
router.get('/:id', reviewController.getReviewById);
router.delete('/:id', reviewController.deleteReview)

router.get('/movieId/reviews', reviewController.getReviewsByMovie);
router.post('/movieId/reviews', validateReview, reviewController.createReview);
module.export = router;