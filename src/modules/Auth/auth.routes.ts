import validateRequest from "../../middlewares/ValidateRequest";
import { AuthController } from "./auth.controller";
import express from "express";
import { loginValidationSchema,registeValidationSchema } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
const router=express.Router();

router.post('/register',auth('admin'),validateRequest
    ( registeValidationSchema),AuthController.registerUser)
router.post('/login',validateRequest(loginValidationSchema),AuthController.loginUser)


//logout
router.post('/logout', AuthController.logout);

//refresh token
router.post(
    '/refresh-token',
    AuthController.refreshToken,
  );

  //Change pass
  router.post('/change-password',AuthController.changePassword);
export const AuthRoutes=router;
