const prisma = require("../config/db");

// Create a new book
const createBook = async (req, res) => {
  // #swagger.tags = ['Books']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const { isbn, title, author, publicationDate, publisher, genreId } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        isbn,
        title,
        author,
        publicationDate,
        publisher,
        genre: { connect: genreId.map((id) => ({ id })) },
      },
    });
    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all books
const getBooks = async (req, res) => {
  // #swagger.tags = ['Books']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a book by ID
const getBookById = async (req, res) => {
  // #swagger.tags = ['Books']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const bookId = req.params.id;
  try {
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error getting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a book by ID
const updateBook = async (req, res) => {
  // #swagger.tags = ['Books']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const bookId = req.params.id;
  const { isbn, title, author, publicationDate, publisher, genreId } = req.body;
  try {
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        isbn,
        title,
        author,
        publicationDate,
        publisher,
        genre: { set: genreId.map((id) => ({ id })) },
      },
    });
    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  // #swagger.tags = ['Books']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const bookId = req.params.id;
  try {
    await prisma.book.delete({ where: { id: bookId } });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };
