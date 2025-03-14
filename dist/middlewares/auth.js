"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utility/catchAsync"));
const user_model_1 = require("../modules/User/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        //check if token sent from the client
        if (!token) {
            throw new AppError_1.default(false, http_status_1.default.UNAUTHORIZED, 'You are not authorized to access this route');
        }
        // Verify the token asynchronously
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_token_secret);
        //check if the user has the required role to access the route
        const { role, email, iat } = decoded;
        // checking if the user is exist
        const user = yield user_model_1.UserModel.isUserExistsByCustomEmail(email);
        if (!user) {
            throw new AppError_1.default(false, 404, 'This user is not found !');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(false, http_status_1.default.UNAUTHORIZED, 'Unauthorized access!');
        }
        req.user = user;
        next();
    }));
};
exports.default = auth;
