import validateRequest from "../../middlewares/ValidateRequest";
import { AuthController } from "./auth.controller";
import express from "express";
import { loginValidationSchema } from "./auth.validation";
const router=express.Router();

router.post('/register',AuthController.registerUser)
router.post('/login',validateRequest(loginValidationSchema),AuthController.loginUser)

export const AuthRoutes=router;