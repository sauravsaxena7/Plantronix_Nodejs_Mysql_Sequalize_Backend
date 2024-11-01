import { Sequelize } from "sequelize";
import { DB_CONFIG } from "../config/db.config";


const connectDb = async () => {

  const sequelize = new Sequelize(
    DB_CONFIG.DB,
    DB_CONFIG.USER,
    DB_CONFIG.PASSWORD,
    {
      host: DB_CONFIG.HOST,
      dialect: DB_CONFIG.dialect,
      operatorsAliases: false,
      pool: {
        max: DB_CONFIG.pool.max,
        min: DB_CONFIG.pool.min,
        acquire: DB_CONFIG.pool.acquire,
        idle: DB_CONFIG.pool.idle,
      },
    }
  );

  await sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

  const db = {};

  db.sequelize = sequelize;
  // db.Sequelize = Sequelize;

  return db;

};

export {connectDb}
