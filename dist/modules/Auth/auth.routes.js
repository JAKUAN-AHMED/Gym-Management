"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const ValidateRequest_1 = __importDefault(require("../../middlewares/ValidateRequest"));
const auth_controller_1 = require("./auth.controller");
const express_1 = __importDefault(require("express"));
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post('/register', (0, ValidateRequest_1.default)(auth_validation_1.registeValidationSchema), auth_controller_1.AuthController.registerUser);
router.post('/login', (0, ValidateRequest_1.default)(auth_validation_1.loginValidationSchema), auth_controller_1.AuthController.loginUser);
//logout
router.post('/logout', auth_controller_1.AuthController.logout);
//refresh token
router.post('/refresh-token', auth_controller_1.AuthController.refreshToken);
//Change pass
router.post('/change-password', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.trainee, user_constant_1.USER_ROLE.trainer), auth_controller_1.AuthController.changePassword);
exports.AuthRoutes = router;
