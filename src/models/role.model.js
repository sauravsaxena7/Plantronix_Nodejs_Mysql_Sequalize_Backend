import { DataTypes } from "sequelize";

const createRoleModel = (sequelize) => {
  const Role = sequelize?.define("Role", {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  }, {
    tableName: "roles"
  });

  return Role;
};

export {createRoleModel}
