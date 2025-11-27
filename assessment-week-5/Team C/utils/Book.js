// utils/Book.js

// Simple Book model (class)
// This helps keep the API clean and organized
class Book {
  constructor(id, title, author) {
    if (!title || !author) {
      throw new Error("Title and author are required");
    }

    this.id = id;
    this.title = title;
    this.author = author;
  }
}

module.exports = Book;
