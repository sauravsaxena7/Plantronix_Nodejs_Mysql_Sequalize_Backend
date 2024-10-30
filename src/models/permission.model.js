const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Permission = sequelize.define("Permission", {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  });

  return Permission;
};
