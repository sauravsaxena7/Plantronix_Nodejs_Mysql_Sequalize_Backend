import { createRoleModel } from "./role.model.js";
import { createUserModel } from "./user.model.js";

let User=null,Sequelize=null,Role=null;

const initalizeModel = (sequelize) => {
    Sequelize=sequelize;

     User = createUserModel(sequelize);
     Role = createRoleModel(sequelize)
    // const Permission = require("./permission")(sequelize);
    // const UserPermission = require("./userPermission")(sequelize);

    Role.hasMany(User, { foreignKey: "roleId" });
    User.belongsTo(Role, { foreignKey: "roleId" });

    // User.belongsToMany(Permission, { through: UserPermission, foreignKey: "userId" });
    // Permission.belongsToMany(User, { through: UserPermission, foreignKey: "permissionId" });

    sequelize.sync({ alter: true });
    

}





export { Sequelize, User, Role ,initalizeModel};
