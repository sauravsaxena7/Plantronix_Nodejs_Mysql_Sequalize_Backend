const { AppError } = require("../utils/errorTypes");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Internal Server Error";

  if (!err.isOperational) {
    console.error("Unexpected Error:", err);
  }

  res.status(statusCode).json({ error: message });
};

module.exports = errorMiddleware;
