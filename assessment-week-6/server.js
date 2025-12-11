const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const exerciseRoutes = require("./routes/exerciseRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();

app.use(logger);
app.use(express.json());

app.use("/api/exercises", exerciseRoutes);
app.use("/api/sessions", sessionRoutes);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.use(errorHandler);

app.listen(3000, () => console.log("Server running"));
