 // app.js
const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// GET /users/:id → return the ID
app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id });
});

// GET /products?category=bread → return query value
app.get("/products", (req, res) => {
  res.json({ category: req.query.category });
});

// POST /login → return message + body
app.post("/login", (req, res) => {
  res.json({
    message: "Login attempt",
    data: req.body
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});