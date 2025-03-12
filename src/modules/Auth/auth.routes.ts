import validateRequest from "../../middlewares/ValidateRequest";
import { AuthController } from "./auth.controller";
import express from "express";
import { loginValidationSchema, registeValidationSchema } from "./auth.validation";
import auth from "../../middlewares/auth";
const router=express.Router();

router.post('/register',validateRequest
    ( registeValidationSchema),AuthController.registerUser)
router.post('/login',validateRequest(loginValidationSchema),AuthController.loginUser)

export const AuthRoutes=router;