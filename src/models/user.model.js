import { DataTypes } from "sequelize";
import { GLOBAL_CONFIG } from "../config/config.js";

const createUserModel = (sequelize) => {
  const User = sequelize?.define("User", {
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
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false },
    refreshToken: { type: DataTypes.STRING },
  }, {
    tableName: "users"
  });

  User?.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, parseInt(GLOBAL_CONFIG.saltRounds, 10));
  });

  if(User){
    User.prototype.validatePassword = async function (password) {
      return await bcrypt.compare(password, this.password);
    };
  }
  

  return User;
};

export { createUserModel }
