const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = process.env;

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false },
    refreshToken: { type: DataTypes.STRING },
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, parseInt(SALT_ROUNDS, 10));
  });

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
