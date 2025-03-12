import config from "../../config";
import catchAsync from "../../utility/catchAsync";
import sendResponse from "../../utility/sendResponse";
import { AuthServices } from "./auth.services";
import bcrypt from "bcrypt";
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
export const AuthController={registerUser,loginUser}