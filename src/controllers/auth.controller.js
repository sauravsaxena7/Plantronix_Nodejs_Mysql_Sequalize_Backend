import { registerUser } from "../services/auth.services.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const register = async (req, res) => {

    const { username, password, roleName,email } = req.body;
    const createdUser = await registerUser(username, password, roleName,email);
    res.status(201).json(
      new ApiResponse(200, createdUser, "User registered Success")
    )
};

// exports.login = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       throw new ValidationError("Username and password are required");
//     }

//     const tokens = await authService.loginUser(username, password);
//     res.json({ message: "Login successful", tokens });
//   } catch (error) {
//     if (error.message === "Invalid credentials") {
//       next(new AuthError());
//     } else {
//       next(error);
//     }
//   }
// };


// exports.refreshToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;
//     const accessToken = await authService.refreshAccessToken(refreshToken);
//     res.json({ accessToken });
//   } catch (error) {
//     res.status(403).json({ error: "Invalid refresh token" });
//   }
// };

export{register}
