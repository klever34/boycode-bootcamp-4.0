let books = require("../data/books")

               
 /* Get All BOOKS */
exports.getAllBooks = (req, res) => {
    res.json(books);
};

//Success did this
/* GET A SINGLE BOOK BY ID */

exports.getBookById = (req, res) => {
    const book = books.find((b) => b.id === id);

    if (!book) {
        return res.status(404).json({message: "Book not found"});
    }

    res.status(200).json(book);
};


// Ismail did this

//POST ... create a new book
exports.createBook = (req, res) => {
    const { author, title } = req.body;
    //Validation for a tile
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const newBookId = books.length + 1;
    const newBook = {
        id: newBookId,
        title,
        author: author || ""
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

//PUT BOOKS ID
exports.updateBook = (req, res) => {
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
exports.deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);
    //validation if book does not exist
    if (index === -1)
        return res.status(404).json({ message: "Book not found" });

    const deleted = books.splice(index, 1);
    res.json({ message: "Book deleted", deleted });
});



