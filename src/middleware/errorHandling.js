// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Prisma database error handling
  if (err.code === "P2025") {
    console.error("Prisma database error:", err);
    return res.status(500).json({ message: "Database error" });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    console.error("Validation error:", err);
    return res.status(400).json({ message: err.message || "Validation error" });
  }

  // Handle unauthorized errors
  if (err.name === "UnauthorizedError") {
    console.error("Unauthorized error:", err);
    return res.status(401).json({ message: err.message || "Unauthorized" });
  }

  // Custom error message for other errors
  console.error("Internal server error:", err);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal server error" });
};

module.exports = errorHandler;
