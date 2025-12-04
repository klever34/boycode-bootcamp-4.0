# boycode-bootcamp-4.0

## Movie Review API (Node.js + Express)

A small RESTful backend for managing movies and reviews. Built for an assessment (week 6) — implements CRUD for movies and a review module with validation and middleware. Data is stored in-memory (demo/testing).

### Key features
- Movies: create, read, replace (PUT), partial update (PATCH), delete
- Reviews: add, list for a movie, retrieve by id, delete
- Validation middleware for movies and reviews
- Simple in-memory data under `data/` (reset on server restart)

### Project layout
- `app.js` — Express app and middleware wiring  
- `server.js` — starts the HTTP server  
- `controllers/` — `movieController.js`, `reviewController.js`  
- `routes/` — `movieRoutes.js`, `reviewRoutes.js`  
- `middleware/` — `logger.js`, `errorHandler.js`, `validateMovie.js`, `validateReview.js`  
- `data/` — `movie.js`, `review.js` (in-memory)  
- `utils/` — `generateId.js`

### Installation & run
Requirements: Node.js v14+ and npm.

From the project folder (Team A assignment):
```powershell
cd 'assessment-week-6\Team A - movie-review Api'
npm install
npm start
```
Server default: http://localhost:3000

### API Endpoints (current implementation)
Note: this project mounts review routes under `/api/review`. Some docs reference nested review routes; the implemented endpoints below reflect the current code.

Movies
- GET `/api/movies` — list movies (supports filtering/sorting/pagination)
- GET `/api/movies/:id` — get movie by id
- POST `/api/movies` — create a movie (uses `validateMovie`)
- PUT `/api/movies/:id` — replace/update a movie (uses `validateMovie`)
- PATCH `/api/movies/:id` — partial update
- DELETE `/api/movies/:id` — delete a movie

Reviews (mounted under `/api/review`)
- GET `/api/review/movie/:movieId` — list reviews for a movie
- GET `/api/review/:id` — get a review by id
- POST `/api/review/:movieId` — add a review for movie `movieId` (uses `validateReview`)
- DELETE `/api/review/:id` — delete a review

(Alternate nested routes commonly used: `/api/movies/:movieId/reviews` — this README documents implemented paths above.)

## Bonus Features

- GET `/api/movies/top-rated` — return movies with `rating` above a threshold (default 4.5). 
- GET `/api/movies/:id/stats` — return aggregated stats for a movie: `reviewCount`, `averageStars` (computed from reviews), and other aggregates as needed.
- Movie slug generation — add a `slug` field on create (e.g. "Inception 2010" → `inception-2010`) generated from title and year


### Testing examples
Create a review (example):
```powershell
curl -X POST http://localhost:3000/api/review/1 -H "Content-Type: application/json" -d '{"reviewer":"Alice","comment":"Great","stars":5}'
```
Use Postman, curl, or similar to exercise other endpoints.

### Notes
- Data is in-memory; restarting the server resets it.
- Error handling and simple logging are provided via middleware.

### Contributors
- Ismail — project setup, movie logic, validation  
- Joseph — review module, routing  
- Success — routes, validation messages, testing  
- AbdulRasaq — review routing, README, logger, testing
- Toluwalase - creatmovie, deletemovie