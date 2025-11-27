// app

// app.js
const express = require("express");
const app = express();

// Middleware
const logger = require("./middleware/logger");

// Use JSON parser
app.use(express.json());

// Log every request
app.use(logger);

// Import routes
const booksRoutes = require("./routes/booksRoutes");

// Mount routes
app.use("/books", booksRoutes);

module.exports = app;
