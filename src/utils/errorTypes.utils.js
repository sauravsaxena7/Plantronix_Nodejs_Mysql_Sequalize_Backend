class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class AuthError extends AppError {
    constructor(message = "Authentication failed") {
      super(message, 401);
    }
  }
  
  class ValidationError extends AppError {
    constructor(message = "Invalid data") {
      super(message, 400);
    }
  }
  
  module.exports = { AppError, AuthError, ValidationError };
  