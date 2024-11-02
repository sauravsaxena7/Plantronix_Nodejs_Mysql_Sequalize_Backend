import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken"

const createUserModel = (sequelize) => {
  console.log("inuser model", sequelize)
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false },
    refreshToken: { type: DataTypes.STRING },
  }, {
    tableName: "users"
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, parseInt(GLOBAL_CONFIG.saltRounds, 10));
  });

  
    User.prototype.validatePassword = async function (password) {
      return await bcrypt.compare(password, this.password);
    };
  
    User.prototype.generateAccessToken = function(){
      return jwt.sign(
          {
              userId: this.userId,
              email: this.email,
              username: this.username,
          },
          process.env.ACCESS_SECRET_KEY,
          {
              expiresIn: process.env.REFRESH_TOKEN_EXPIRY
          }
      )
  }
    
  

  return User;
};

export { createUserModel }
