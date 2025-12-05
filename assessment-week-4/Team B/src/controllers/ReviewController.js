const reviews = require("../data/reviews");

// GET /reviews?movieId=2
exports.getReviews = (req, res) => {
  const { movieId } = req.query;

  let result = reviews;

  if (movieId) {
    result = result.filter(
      (item) => item.movieId === parseInt(movieId)
    );
  }

  res.json(result);
};

// GET /reviews/rating?rating[gte]=4
exports.getReviewsByRating = (req, res) => {
  const { rating } = req.query;

  let result = reviews;

  if (rating && rating.gte) {
    result = result.filter(
      (item) => item.rating >= parseFloat(rating.gte)
    );
  }

  res.json(result);
};

// GET /reviews/filter?movieId=3&rating[gt]=4&sort=-rating
exports.getFilteredAndSortedReviews = (req, res) => {
  const { movieId, rating, sort } = req.query;

  let result = reviews;

  // FILTERS
  if (movieId) {
    result = result.filter((item) => item.movieId === parseInt(movieId));
  }

  if (rating) {
    if (rating.gte) result = result.filter((item) => item.rating >= parseFloat(rating.gte));
    if (rating.lte) result = result.filter((item) => item.rating <= parseFloat(rating.lte));
    if (rating.gt)  result = result.filter((item) => item.rating > parseFloat(rating.gt));
    if (rating.lt)  result = result.filter((item) => item.rating < parseFloat(rating.lt));
  }

  // SORTING
  if (sort) {
    const sortField = sort.startsWith("-") ? sort.slice(1) : sort;
    const sortOrder = sort.startsWith("-") ? -1 : 1;

    result = result.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
  }

  res.json(result);
};

// GET /reviews/paginate?page=1&limit=3
exports.getReviewsWithPagination = (req, res) => {
  let result = reviews;

  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  res.json({
    page,
    limit,
    total: result.length,
    results: result.slice(startIndex, endIndex)
  });
};
