const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// CRUD Book
router.post("/", verifyToken, isAdmin, createBook);
router.get("/", verifyToken, getBooks);
router.get("/:id", verifyToken, getBookById);
router.put("/:id", verifyToken, isAdmin, updateBook);
router.delete("/:id", verifyToken, isAdmin, deleteBook);

module.exports = router;
