import dotenv from "dotenv"

const GLOBAL_CONFIG = {
  jwt: {
    accessSecret: process.env.ACCESS_SECRET_KEY,
    refreshSecret: process.env.REFRESH_SECRET_KEY,
    accessExpiry: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  },

  saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 12,
  logLevel: process.env.LOG_LEVEL || "info",
};

export {GLOBAL_CONFIG}
