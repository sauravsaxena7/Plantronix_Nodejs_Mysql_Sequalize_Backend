const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, verifyPassword };
