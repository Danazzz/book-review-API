const express = require("express");
const cors = require("cors");
const errorHandler = require('./src/middleware/errorHandling');
const authRoutes = require("./src/routes/authRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const genreRoutes = require("./src/routes/genreRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/reviews", reviewRoutes);



app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile,));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});