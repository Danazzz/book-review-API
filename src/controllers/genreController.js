const prisma = require("../config/db");

// Create a new genre
const createGenre = async (req, res) => {
  // #swagger.tags = ['Genre']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const { name } = req.body;
  try {
    const genre = await prisma.genre.create({ data: { name } });
    res.status(201).json(genre);
  } catch (error) {
    console.error("Error creating genre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all genres
const getGenres = async (req, res) => {
  // #swagger.tags = ['Genre']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  try {
    const genres = await prisma.genre.findMany();
    res.json(genres);
  } catch (error) {
    console.error("Error getting genres:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a genre by ID
const getGenreById = async (req, res) => {
  // #swagger.tags = ['Genre']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const genreId = req.params.id;
  try {
    const genre = await prisma.genre.findUnique({ where: { id: genreId } });
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }
    res.json(genre);
  } catch (error) {
    console.error("Error getting genre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a genre by ID
const updateGenre = async (req, res) => {
  // #swagger.tags = ['Genre']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const genreId = req.params.id;
  const { name } = req.body;
  try {
    const updatedGenre = await prisma.genre.update({
      where: { id: genreId },
      data: { name },
    });
    res.json(updatedGenre);
  } catch (error) {
    console.error("Error updating genre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a genre by ID
const deleteGenre = async (req, res) => {
  // #swagger.tags = ['Genre']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const genreId = req.params.id;
  try {
    await prisma.genre.delete({ where: { id: genreId } });
    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
    console.error("Error deleting genre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
};
