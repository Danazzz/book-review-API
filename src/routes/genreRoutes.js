const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/auth");
const {
  createGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} = require("../controllers/genreController");
const verifyToken = require("../middleware/verifyToken");

// CRUD Genre
router.post("/", verifyToken, isAdmin, createGenre);
router.get("/", verifyToken, getGenres);
router.get("/:id", verifyToken, getGenreById);
router.put("/:id", verifyToken, isAdmin, updateGenre);
router.delete("/:id", verifyToken, isAdmin, deleteGenre);

module.exports = router;
