const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access token required" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    req.user = await User.findByPk(decoded.id, { include: Role });
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid access token" });
  }
};

const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.Role.name)) return res.status(403).json({ error: "Forbidden" });
  next();
};

module.exports = { authenticateToken, authorizeRole };
