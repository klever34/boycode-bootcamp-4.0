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
