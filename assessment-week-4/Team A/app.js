// Tolu did this
const express = require("express");
const app = express();

const bookRoutes = require("./routes/bookRoutes");
const logger = require("./middleware/logger");


app.use(express.json());

app.use(logger);

app.use("/api/book", bookRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
