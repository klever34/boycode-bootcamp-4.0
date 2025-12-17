const express = require('express');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const exerciseRoutes = require('./routes/exerciseRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();

// 1. Built-in Middleware
app.use(express.json()); 

// 2. Custom Middleware
app.use(logger); 

// 3. Mount Routes
app.use('/api/exercises', exerciseRoutes);
app.use('/api/sessions', sessionRoutes);

// 4. 404 Handler 
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// 5. Global Error Handler 
app.use(errorHandler);

module.exports = app;
