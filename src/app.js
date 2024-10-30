const express = require("express");
const rateLimiter = require("./config/rateLimit");
const authRoutes = require("./routes/authRoutes");
const auditMiddleware = require("./middlewares/auditMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleWare");

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use(auditMiddleware); // Add audit logging middleware

app.use("/auth", authRoutes);

app.use(errorMiddleware); // Centralized error handling

module.exports = app;
