const { User, Role, Permission, UserPermission } = require("../models");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");

exports.registerUser = async (username, password, roleName) => {
  const role = await Role.findOne({ where: { name: roleName } });
  if (!role) throw new Error("Role not found");

  return User.create({ username, password: await bcrypt.hash(password, 12), roleId: role.id });
};

exports.loginUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user || !(await user.validatePassword(password))) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await user.update({ refreshToken });

  return { accessToken, refreshToken };
};

exports.refreshAccessToken = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
  const user = await User.findByPk(decoded.id);
  if (!user || user.refreshToken !== refreshToken) throw new Error("Invalid refresh token");

  return generateAccessToken(user);
};
