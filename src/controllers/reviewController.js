const prisma = require("../config/db");

// Create a new review
const createReview = async (req, res) => {
  // #swagger.tags = ['Review']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const { comment, likes, dislikes, bookId } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        comment,
        likes,
        dislikes,
        user: { connect: { id: req.user.id } },
        book: { connect: { id: bookId } },
      },
    });
    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all reviews
const getReviews = async (req, res) => {
  // #swagger.tags = ['Review']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  try {
    const reviews = await prisma.review.findMany();
    res.json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a review by ID
const updateReview = async (req, res) => {
  // #swagger.tags = ['Review']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const reviewId = req.params.id;
  const { comment, likes, dislikes } = req.body;
  try {
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { comment, likes, dislikes },
    });
    res.json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
  // #swagger.tags = ['Review']
  /* #swagger.security = [{
        "bearerAuth": []
    }] */
  const reviewId = req.params.id;
  try {
    await prisma.review.delete({ where: { id: reviewId } });
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createReview, getReviews, updateReview, deleteReview };
