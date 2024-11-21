
import jwt from "jsonwebtoken"
import { User, Role } from "../models/index.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJWTToken = asyncHandler(async (req, _, next) => {
    try {
        const token = req.headers["authorization"]?.replace("Bearer ", "");

       
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        console.log("token1",token);
        console.log("process.env.ACCESS_SECRET_KEY1",process.env.ACCESS_SECRET_KEY);
        const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY)
        console.log("token",token);
        console.log("process.env.ACCESS_SECRET_KEY",process.env.ACCESS_SECRET_KEY);
        const currentUser = await User.findByPk(decodedToken.userId, { include: Role });
        if (!currentUser) {

            throw new ApiError(401, "Invalid User Token.")
        }
        req.User = currentUser;
        next()
    } catch (error) {
        console.log("lola auth middleware catch block")
        throw new ApiError(401, error?.message || "Invalid access token")
    }

});

const authorizeUserRoles = (roles) => asyncHandler((req, res, next) => {
    if (!roles.includes(req.User.Role.name)) return res.status(403).json({ error: "Forbidden" });
    next();
  }
);



export { verifyJWTToken ,authorizeUserRoles}