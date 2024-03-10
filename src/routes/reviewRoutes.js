const express = require("express");
const router = express.Router();
const { isUser } = require("../middleware/auth");
const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const verifyToken = require("../middleware/verifyToken");

// CRUD Review
router.post("/", verifyToken, isUser, createReview);
router.get("/", verifyToken, getReviews);
router.put("/:id", verifyToken, isUser, updateReview);
router.delete("/:id", verifyToken, isUser, deleteReview);

module.exports = router;
