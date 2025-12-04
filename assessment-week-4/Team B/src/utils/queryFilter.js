const applyQueryFilters = (movies, queryParams) => {
    let filteredMovies = [...movies]; // Start with a copy of the data

    // --- 1. Filtering Logic ---
    const { genre, year, rating, sort, limit, page } = queryParams;

    // Filter by genre
    if (genre) {
        // Filter is case-sensitive here, consider converting to lowercase for robust filtering
        filteredMovies = filteredMovies.filter(m => m.genre === genre);
    }
    
    // Filter by year
    if (year) {
        const queryYear = parseInt(year);
        // We only support exact year match in this simple implementation
        if (!isNaN(queryYear)) {
            filteredMovies = filteredMovies.filter(m => m.year === queryYear);
        }
    }

    // Filter by rating[gte] (greater than or equal)
    if (rating && rating.gte) {
        const minRating = parseFloat(rating.gte);
        if (!isNaN(minRating)) {
            // Note: rating is optional in the data, so check if m.rating exists
            filteredMovies = filteredMovies.filter(m => m.rating && m.rating >= minRating);
        }
    }
    
    // --- 2. Sorting Logic ---
    if (sort) {
        // Ensure the sort field is allowed (e.g., 'year' or 'rating')
        if (['year', 'rating', 'title'].includes(sort)) {
            // Simple ascending sort
            filteredMovies.sort((a, b) => {
                if (a[sort] < b[sort]) return -1;
                if (a[sort] > b[sort]) return 1;
                return 0;
            });
        }
    }

    // --- 3. Pagination Logic ---
    const defaultLimit = 10;
    
    // Set limit, defaulting to 10
    const finalLimit = parseInt(limit) || defaultLimit;
    
    // Set page, defaulting to 1
    const finalPage = parseInt(page) || 1;

    // Input validation for page and limit
    if (finalPage < 1 || finalLimit < 1) {
        return { error: 'Invalid page or limit parameter. Page and limit must be positive integers.' };
    }
    
    const totalCount = filteredMovies.length;
    const startIndex = (finalPage - 1) * finalLimit;
    const endIndex = finalPage * finalLimit;

    const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

    return {
        totalMovies: totalCount,
        currentPage: finalPage,
        totalPages: Math.ceil(totalCount / finalLimit),
        movies: paginatedMovies
    };
};

module.exports = applyQueryFilters;