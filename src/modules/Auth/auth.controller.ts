import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { AuthServices } from "./auth.services";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
//register
const registerUser = catchAsync(async (req, res) => {
    const {name,email,password,role}=req.body;
    const hashedpass=await bcrypt.hash(password,10);
    const result = await AuthServices.registerUser({name,email,password:hashedpass,role});
    const isTrue: boolean = result ? true : false;
    sendResponse(res, {
      statusCode: isTrue ? 200 : 500,
      success: isTrue,
      message: isTrue
        ? 'Congratulation to the new World!'
        : 'Registration failed!',
      Data: isTrue ? result : [],
    });
  });

  const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { accesToken, refreshToken } = result;
  
    //set cookie
    res.cookie('refreshToken', refreshToken, {
      secure: config.node_env === 'production',
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
  
    sendResponse(res, {
      statusCode: accesToken ? 200 : 500,
      success: true,
      message: accesToken ? 'login successful' : 'Unauthorized access',
      Data: accesToken ? { token: accesToken } : [],
    });
  });


  // log out
  const logout = catchAsync(async (req, res) => {
    if (req.cookies.refreshToken && req.headers.authorization) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
  
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Logout successful',
        Data: [],
      });
    } else {
      sendResponse(res, {
        statusCode: 400,
        success: false,
        message: 'No token found. User is not logged in.',
        Data: [],
      });
    }
  });


  //refreshToken
  const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token is retrieved succesfully!',
      Data: result,
    });
  });

  
  //Change password
const changePassword=catchAsync(async (req,res)=>{
  const {...passwordData}=req.body;
 console.log(req.user)
  const result=await AuthServices.changePasswordIntoDB(req.user,passwordData);
  sendResponse(res,{
      statusCode:httpStatus.OK,
      message:"Password changed successfully",
      success:true,
      Data:result
  })
});

export const AuthController={registerUser,loginUser,logout,refreshToken,changePassword}