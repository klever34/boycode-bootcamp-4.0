const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory "database" (replace with real DB for production)
let books = [
  { id: uuidv4(), title: "Things Fall Apart", author: "Chinua Achebe" },
  { id: uuidv4(), title: "Zero to One", author: "Peter Thiel" },
  { id: uuidv4(), title: "Nigerian Dreams", author: "John Doe" }
];

/**
 * Helpers
 */
function findBookIndex(id) {
  return books.findIndex(b => b.id === id);
}

/**
 * 1. GET /books - list all books
 */
app.get('/books', (req, res) => {
  res.json(books);
});

/**
 * 2. GET /books/:id - return single book
 */
app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find(b => b.id === id);

  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

/**
 * Add: /books/search?author=John
 * - case-insensitive partial match on author
 */
app.get('/books/search', (req, res) => {
  const q = req.query.author;
  if (!q) return res.status(400).json({ error: 'author query parameter required' });

  const lowered = q.toLowerCase();
  const results = books.filter(b => (b.author || '').toLowerCase().includes(lowered));
  res.json(results);
});

/**
 * 3. POST /books - create a new book
 * Body: { title: "...", author: "..." }
 * Basic validation: title must exist
 */
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newBook = {
    id: uuidv4(),
    title: title.trim(),
    author: (author || '').trim()
  };

  books.unshift(newBook); // newest first
  res.status(201).json(newBook);
});

/**
 * 4. PUT /books/:id - update title and/or author
 */
app.put('/books/:id', (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;

  const idx = findBookIndex(id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });

  // If title provided, validate it
  if (title !== undefined) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    books[idx].title = title.trim();
  }

  if (author !== undefined) {
    books[idx].author = (author || '').trim();
  }

  res.json(books[idx]);
});

/**
 * 5. DELETE /books/:id - delete by id
 */
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const idx = findBookIndex(id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });

  books.splice(idx, 1);
  res.status(204).send(); // no content
});

/**
 * Generic 404 for any other routes
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Book API listening on http://localhost:${PORT}`);
});
