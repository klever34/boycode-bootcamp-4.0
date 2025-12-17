const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Route handlers
const exerciseRoutes = require("./routes/exerciseRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();

// Attach middleware
app.use(logger); // logs method/path/timestamp for each request
app.use(express.json()); // parse JSON bodies for POST/PUT requests

// Mount resources under /api
app.use("/api/exercises", exerciseRoutes);
app.use("/api/sessions", sessionRoutes);

// Catch-all 404 for unknown routes
app.use((req, res) => res.status(404).json({ message: "Not found" }));

// Error handler should be the last middleware
app.use(errorHandler);

// Start server (port hard-coded for this small exercise)
app.listen(3000, () => console.log("Server running"));
