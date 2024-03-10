const express = require("express");
const router = express.Router();
const { isUser } = require("../middleware/auth");
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");
const verifyToken = require("../middleware/verifyToken");

// CRUD Profile
router.post("/", verifyToken, isUser, createProfile);
router.get("/", verifyToken, isUser, getProfile);
router.put("/", verifyToken, isUser, updateProfile);
router.delete("/", verifyToken, isUser, deleteProfile);

module.exports = router;
