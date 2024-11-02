import { Sequelize } from "sequelize";
import { initalizeModel } from "../models/index.model.js";
import dotenv from "dotenv"

const connectDb = async () => {
  await dotenv.config({path: '../../.env'})

  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    // 'Plantronix',
    // 'root',
    // 'root',
    {
      host:  process.env.DB_HOST,
      // host:  '127.0.0.1',
      dialect: process.env.DIALECT,
      // dialect:'mysql',
      operatorsAliases: false,
      port:3306,
      pool: {
        max: 3,
        // min: DB_CONFIG.pool.min,
        acquire: 60000,
        idle: 30000,
      },
    }
  );

  await sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.',process.env.DB_PASS);
    initalizeModel(sequelize);
  }).catch((error) => {
    console.log("connection error",DB_CONFIG)
    console.error('Unable to connect to the database: ', error);
  });

  const db = {};

  db.sequelize = sequelize;
  // db.Sequelize = Sequelize;

  return db;

};

export {connectDb}
