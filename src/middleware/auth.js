const prisma = require("../config/db");

const isAdmin = async (req, res, next) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};

const isUser = async (req, res, next) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== "USER") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = { isAdmin, isUser };
