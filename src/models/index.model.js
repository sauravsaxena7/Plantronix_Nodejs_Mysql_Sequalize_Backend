import { db } from "../server";
import { createRoleModel } from "./role.model";
import { createUserModel } from "./user.model";

const sequelize = db?.sequelize

const User = createUserModel(sequelize);
const Role = createRoleModel(sequelize)
// const Permission = require("./permission")(sequelize);
// const UserPermission = require("./userPermission")(sequelize);

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

// User.belongsToMany(Permission, { through: UserPermission, foreignKey: "userId" });
// Permission.belongsToMany(User, { through: UserPermission, foreignKey: "permissionId" });

sequelize.sync({ alter: true });

export{ sequelize, User, Role };
