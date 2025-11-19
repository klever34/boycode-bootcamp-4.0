const express = require('express');

const app = express();
app.use(express.json());   // <-- REQUIRED
const PORT = 3000;



//DATABASE
const books = [
    { id: 1, title: "Zero to One", author: "Peter Thiel" },
    { id: 2, title: "Distasteful Habits", author: "John Carter" }
];

//GET BOOK .... RETURNS LIST OF ALL BOOKS
app.get("/books", (req, res) => {
    res.json(books);
});

//GET BOOKS ID ... RETURNS A SINGLE BOOK
app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("BOOK NOT FOUND");
    }
});


//POST ... create a new book
app.post("/books", (req, res) => {
    const { author, title } = req.body;
    //Validation for a tile
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const newBookId = books.length + 1;
    const newBook = {
        id: newBookId,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

//PUT BOOKS ID
app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    //validation
    if (!book) {
        return res.status(404).send("BOOK NOT FOUND");
    }
    const { title, author } = req.body;
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;

    return res.json({
        message: "Book updated successfully",
        book
    });
});

//DELETE BOOKS ID
app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);
    //validation if book does not exist
    if (index === -1)
        return res.status(404).json({ message: "Book not found" });

    const deleted = books.splice(index, 1);
    res.json({ message: "Book deleted", deleted });
});


//Starting our server
app.listen(PORT, () => {
    console.log('Server is running on Port 3000');
});