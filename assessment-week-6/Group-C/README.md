# 📘 README.md -- Movie & Review API

A lightweight **Node.js + Express** API for managing movies and their
reviews.\
All data is stored **in-memory**, making the project easy to run, test,
and understand.

------------------------------------------------------------------------

## 🚀 How to Run the Project

### 1️⃣ Install dependencies

``` bash
npm install
```

### 2️⃣ Start the server

Development mode (auto restarts):

``` bash
npm run dev
```

Production mode:

``` bash
npm start
```

### 3️⃣ Server URL

Your API will run on:

    http://localhost:3000

------------------------------------------------------------------------

## 🌐 Available Endpoints

### 🎬 MOVIES

  ---------------------------------------------------------------------------------
  Method             Endpoint                         Description
  ------------------ -------------------------------- -----------------------------
  GET                `/api/movies`                    Get all movies (supports
                                                      filtering, sorting,
                                                      pagination)

  GET                `/api/movies/:id`                Get a single movie by ID

  POST               `/api/movies`                    Create a new movie

  PUT                `/api/movies/:id`                Replace a movie (full update)

  PATCH              `/api/movies/:id`                Update part of a movie

  DELETE             `/api/movies/:id`                Delete a movie

  GET                `/api/movies/:movieId/reviews`   Get all reviews for a movie

  POST               `/api/movies/:movieId/reviews`   Add a review for a movie
  ---------------------------------------------------------------------------------

------------------------------------------------------------------------

### ⭐ REVIEWS

  Method   Endpoint             Description
  -------- -------------------- ---------------------------
  GET      `/api/reviews/:id`   Get a single review by ID
  DELETE   `/api/reviews/:id`   Delete a review

------------------------------------------------------------------------

## 🎁 Bonus Features Implemented

### ✔ Filtering Movies

-   By genre: `?genre=sci-fi`
-   By year: `?year=2014`
-   By minimum rating: `?rating[gte]=4`

### ✔ Sorting Movies

-   Ascending: `?sort=year`
-   Descending: `?sort=-rating`

### ✔ Pagination

-   `?limit=5&page=2`

### ✔ Nested Review Routes

Reviews are nested under their movies:

    /api/movies/:movieId/reviews

### ✔ Logger Middleware

Every request logs time, method, and URL.

### ✔ Central Error Handler

Consistent JSON error responses across the API.
