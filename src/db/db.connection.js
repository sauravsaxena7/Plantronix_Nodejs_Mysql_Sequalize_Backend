import { Sequelize } from "sequelize";


const connectDb = async () => {

  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      operatorsAliases: false,
      // pool: {
      //   max: DB_CONFIG.pool.max,
      //   min: DB_CONFIG.pool.min,
      //   acquire: DB_CONFIG.pool.acquire,
      //   idle: DB_CONFIG.pool.idle,
      // },
    }
  );

  await sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.log("connection error",process.env.DB_HOST)
    console.error('Unable to connect to the database: ', error);
  });

  const db = {};

  db.sequelize = sequelize;
  // db.Sequelize = Sequelize;

  return db;

};

export {connectDb}
