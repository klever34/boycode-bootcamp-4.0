const express = require('express');
const Book = require('../../user_db');

const app = express();
app.use(express.json());
Port = 4000

let books = []; // store books

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET a book by id
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(book);
});

// POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  try {
    const newBook = new Book(books.length + 1, title, author);
    books.push(newBook);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a book
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }
  books.splice(index, 1);
  res.status(204).send();
});

// SEARCH books by author
app.get('/books/search', (req, res) => {
  const author = req.query.author;
  if (!author) {
    return res.status(400).json({ error: "Author query is required" });
  }
  const results = books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  res.json(results);
});

app.listen(Port, () => console.log(`Server running on port ${Port}`));