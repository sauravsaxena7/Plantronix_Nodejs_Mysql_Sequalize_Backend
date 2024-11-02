
import jwt from "jsonwebtoken"
import { User, Role } from "../models/index.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWTToken = asyncHandler(async (req, _, next) => {
    try {
        const token = req.headers["authorization"]?.replace("Bearer ", "");

        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const currentUser = await User.findByPk(decodedToken.userId, { include: Role });
        if (!currentUser) {

            throw new ApiError(401, "Invalid User Token.")
        }
        req.User = currentUser;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

});

const authorizeUserRoles = (roles) => asyncHandler((req, res, next) => {
    if (!roles.includes(req.User.Role.name)) return res.status(403).json({ error: "Forbidden" });
    next();
  }
);



export { verifyJWTToken ,authorizeUserRoles}