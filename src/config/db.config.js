import dotenv from "dotenv"
const DB_CONFIG={
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.DB_NAME,
    dialect: process.env.DIALECT,
    pool: {
      max: 3,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  export {DB_CONFIG}