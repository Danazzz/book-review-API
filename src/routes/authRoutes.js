const express = require("express");
const router = express.Router();
const {
  register,
  login,
  changePassword,
} = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.put("/change-password", verifyToken, changePassword);

module.exports = router;
