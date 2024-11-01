// const { User, Role, Permission, UserPermission } = require("../models");
// const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
// const bcrypt = require("bcrypt");

import { QueryTypes } from "sequelize";
import { Role } from "../models/index.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { db } from "../server";

const registerUser = asyncHandler(async (username, password, roleName, email) => {
  const role = await Role.findOne({ where: { name: roleName } });
  if (!role) throw new ApiError(404, "Role not found");

  if (
    [email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }
  const existingUser = await db?.sequelize?.query('SELECT * FROM users WHERE username = :username or email=:email', {
    replacements: { username: username, email: email },
    type: QueryTypes.SELECT,
  });

  console.log("existingUser",existingUser);

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists")
  }

  const savedUser =await User.create({username: username, password: password, roleId: role.roleId ,email:email });

  return savedUser;
});
// const loginUser = async (username, password) => {
//   const user = await User.findOne({ where: { username } });
//   if (!user || !(await user.validatePassword(password))) throw new Error("Invalid credentials");

//   const accessToken = generateAccessToken(user);
//   const refreshToken = generateRefreshToken(user);
//   await user.update({ refreshToken });

//   return { accessToken, refreshToken };
// };

// const refreshAccessToken = async (refreshToken) => {
//   const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
//   const user = await User.findByPk(decoded.id);
//   if (!user || user.refreshToken !== refreshToken) throw new Error("Invalid refresh token");

//   return generateAccessToken(user);
// };


export {registerUser}
