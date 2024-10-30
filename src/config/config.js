require("dotenv").config();

const config = {
  environment: process.env.NODE_ENV || "development",
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
    dialect: "mysql",
    logging: process.env.LOG_LEVEL === "debug" ? console.log : false,
  },
  jwt: {
    accessSecret: process.env.ACCESS_SECRET_KEY,
    refreshSecret: process.env.REFRESH_SECRET_KEY,
    accessExpiry: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 12,
  logLevel: process.env.LOG_LEVEL || "info",
};

module.exports = config;
