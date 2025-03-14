import AppError from "../../errors/AppError";
import { IUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import httpStatus from  "http-status";
import { createToken } from "./auth.utils";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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


  //REFRESH TOKEN
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.refress_token_secret as string,
  ) as JwtPayload;

  const { id,email, iat } = decoded;

  // checking if the user is exist
  const user = await UserModel.isUserExistsByCustomEmail(email);

  if (!user) {
    throw new AppError(false,httpStatus.NOT_FOUND, 'This user is not found !');
  }
  

  

  const JwtPayload:any = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    JwtPayload,
    config.access_token_secret as string,
    config.refresh_token_expires as string,
  );

  return {
    accessToken,
  };
};

//change pass
const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistsByCustomEmail(userData.email);

  if (!user) {
    throw new AppError(false,httpStatus.NOT_FOUND, 'This user is not found !');
  }
  


  

  //checking if the password is correct

  if (!(await UserModel.isPasswordMatch(payload.oldPassword, user?.password)))
    throw new AppError(false,httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(10),
  );

  await UserModel.findOneAndUpdate(
    {
      id: userData.id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

export const AuthServices={
    registerUser,
    loginUser,
    refreshToken,
    changePasswordIntoDB
}