const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: true, message: 'Authorization header missing' });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: true, message: 'Token not provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(403).json({ error: true, message: 'Invalid token' });
    }
    req.user = decoded.user; // Assuming the user ID is stored under the 'user' property in the token payload
    next();
  });
};

module.exports = verifyToken;
