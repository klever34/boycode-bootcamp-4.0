// controllers/booksController.js

const Book = require("../utils/Book");

// Temporary in-memory data store
let books = [];

// Get all books
exports.getAllBooks = (req, res) => {
  res.json(books);
};

// Get a single book by ID
exports.getBookById = (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
};

// Create a new book
exports.createBook = (req, res) => {
  const { title, author } = req.body;

  try {
    const newBook = new Book(books.length + 1, title, author);

    books.push(newBook);

    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a book
exports.updateBook = (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  const { title, author } = req.body;

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
};

// Delete a book
exports.deleteBook = (req, res) => {
  const id = parseInt(req.params.id);

  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(index, 1);

  res.status(204).send();
};

// Search books by author
exports.searchBooks = (req, res) => {
  const { author } = req.query;

  if (!author) {
    return res.status(400).json({ error: "Author query is required" });
  }

  const results = books.filter(b =>
    b.author.toLowerCase().includes(author.toLowerCase())
  );

  res.json(results);
};
