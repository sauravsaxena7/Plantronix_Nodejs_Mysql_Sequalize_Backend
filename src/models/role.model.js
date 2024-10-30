const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Role = sequelize.define("Role", {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  });

  return Role;
};
