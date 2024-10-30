const express = require("express");
const { authenticateToken, authorizeRole } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/admin", authenticateToken, authorizeRole(["Admin"]), (req, res) => {
  res.json({ message: "Admin access granted" });
});

router.get("/user", authenticateToken, authorizeRole(["User", "Admin"]), (req, res) => {
  res.json({ message: "User access granted" });
});

module.exports = router;
