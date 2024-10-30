const { Sequelize } = require("sequelize");
const dbConfig = require("../config/config")[process.env.NODE_ENV || "development"];
const sequelize = new Sequelize(dbConfig);

const User = require("./user")(sequelize);
const Role = require("./role")(sequelize);
const Permission = require("./permission")(sequelize);
const UserPermission = require("./userPermission")(sequelize);

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

User.belongsToMany(Permission, { through: UserPermission, foreignKey: "userId" });
Permission.belongsToMany(User, { through: UserPermission, foreignKey: "permissionId" });

sequelize.sync({ alter: true });

module.exports = { sequelize, User, Role, Permission, UserPermission };
