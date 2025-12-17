const express = require("express");
const router = express.Router();

// Import controller
const booksController = require("../controllers/booksController");

// All book routes (clean and grouped)
router.get("/", booksController.getAllBooks);
router.get("/search", booksController.searchBooks);
router.get("/:id", booksController.getBookById);
router.post("/", booksController.createBook);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;
