import AppError from "../../errors/AppError";
import { IUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import httpStatus from  "http-status";
import { createToken } from "./auth.utils";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
const registerUser = async (payload: IUser) => {
   return await UserModel.create(payload);
  };

  const loginUser = async (payload: TLoginUser) => {
    //   check if user exist
    const user = await UserModel.isUserExistsByCustomEmail(payload.email);
    if (!user) {
      throw new AppError(false,httpStatus.NOT_FOUND, 'User not found');
    }
  
    
  
    // check if password match
    const storedHashedPassword = user.password;
    if (
      !(await UserModel.isPasswordMatch(payload.password, storedHashedPassword))
    ) {
      throw new AppError(false,httpStatus.UNAUTHORIZED, 'Invalid password');
    }
  
    // access granted:send accestoken,refreshtoken
  
    const JwtPayload = {
      email: user.email,
      role: user.role, 
    };
  
    //create toke and send to the client
    const accesToken = createToken(
      JwtPayload,
      config.access_token_secret as string,
      config.access_token_expires as string,
    );
  
    //refresh token
    const refreshToken = createToken(
      JwtPayload,
      config.refress_token_secret as string,
      config.refresh_token_expires as string,
    );
  
    return {
      accesToken,
      refreshToken,
    };
  };
export const AuthServices={
    registerUser,
    loginUser
}