import { Role,User,Sequelize } from "../models/index.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Op, QueryTypes } from "sequelize";

const register = asyncHandler(async (req,res,next) => {

  const { username, password, roleName,email } = req.body;
  
  const role = await Role.findOne({ where: { name: roleName } });
  console.log("role",role)
  if (!role) throw new ApiError(404, "Role not found");

  if (
    [email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }
  const existingUser = await Sequelize.query('SELECT * FROM users WHERE username = :username OR email=:email', {
    replacements: { username: username, email: email },
    type: QueryTypes.SELECT,
  });


  console.log("existingUser",existingUser);

  if (existingUser?.length>0) {
    throw new ApiError(409, "User with email or username already exists")
  }

  const savedUser =await User.create({username: username, password: password, roleId: role.roleId ,email:email });
  delete savedUser.dataValues.password
  console.log("savedUser",savedUser);
  res.status(201).json(
    new ApiResponse(200, savedUser, "User registered Success")
  );
});

const loginUser = asyncHandler(async (req, res) =>{
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const {email, username, password} = req.body
  console.log(email);

  if (!username && !email) {
      throw new ApiError(400, "username or email is required")
  }
  
  // Here is an alternative of above code based on logic discussed in video:
  // if (!(username || email)) {
  //     throw new ApiError(400, "username or email is required")
      
  // }

  const ExistingUser = await User.findOne({
    where: {
      [Op.or]: [{ username: username }, { email: email }],
    },
  });

  if (!ExistingUser) {
      throw new ApiError(404, "User does not exist")
  }

 const isPasswordValid =  await ExistingUser.validatePassword(password);

 if (!isPasswordValid) {
  throw new ApiError(401, "Invalid user credentials")
  }

   
 const token = await ExistingUser.generateAccessToken();
 delete ExistingUser.dataValues.password
 console.log("ExistingUser",ExistingUser)
  return res
  .status(200)
  .json(
      new ApiResponse(
          200, 
          {
              user: ExistingUser, token:token
          },
          "User logged In Successfully"
      )
  )

})


export{register,loginUser}
