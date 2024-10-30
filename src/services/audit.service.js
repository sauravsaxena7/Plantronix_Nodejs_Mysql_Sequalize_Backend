const { AuditLog } = require("../models");

exports.logAction = async ({ userId, action, status, timestamp }) => {
  await AuditLog.create({ userId, action, status, timestamp });
};
