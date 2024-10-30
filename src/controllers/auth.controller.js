const authService = require("../services/authService");
const { AuthError, ValidationError } = require("../utils/errorTypes");

exports.register = async (req, res, next) => {
  try {
    const { username, password, roleName } = req.body;
    if (!username || !password || !roleName) {
      throw new ValidationError("Username, password, and role are required");
    }

    const user = await authService.registerUser(username, password, roleName);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ValidationError("Username and password are required");
    }

    const tokens = await authService.loginUser(username, password);
    res.json({ message: "Login successful", tokens });
  } catch (error) {
    if (error.message === "Invalid credentials") {
      next(new AuthError());
    } else {
      next(error);
    }
  }
};


exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = await authService.refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
};
