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
exports.AuthServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../User/user.model");
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.create(payload);
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   check if user exist
    const user = yield user_model_1.UserModel.isUserExistsByCustomEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(false, http_status_1.default.NOT_FOUND, 'User not found');
    }
    // check if password match
    const storedHashedPassword = user.password;
    if (!(yield user_model_1.UserModel.isPasswordMatch(payload.password, storedHashedPassword))) {
        throw new AppError_1.default(false, http_status_1.default.UNAUTHORIZED, 'Invalid password');
    }
    // access granted:send accestoken,refreshtoken
    const JwtPayload = {
        email: user.email,
        role: user.role,
    };
    //create toke and send to the client
    const accesToken = (0, auth_utils_1.createToken)(JwtPayload, config_1.default.access_token_secret, config_1.default.access_token_expires);
    //refresh token
    const refreshToken = (0, auth_utils_1.createToken)(JwtPayload, config_1.default.refress_token_secret, config_1.default.refresh_token_expires);
    return {
        accesToken,
        refreshToken,
    };
});
//REFRESH TOKEN
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.refress_token_secret);
    const { id, email, iat } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.UserModel.isUserExistsByCustomEmail(email);
    if (!user) {
        throw new AppError_1.default(false, http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    const JwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(JwtPayload, config_1.default.access_token_secret, config_1.default.refresh_token_expires);
    return {
        accessToken,
    };
});
//change pass
const changePasswordIntoDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.UserModel.isUserExistsByCustomEmail(userData.email);
    if (!user) {
        throw new AppError_1.default(false, http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    //checking if the password is correct
    if (!(yield user_model_1.UserModel.isPasswordMatch(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(false, http_status_1.default.FORBIDDEN, 'Password do not matched');
    //hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(10));
    yield user_model_1.UserModel.findOneAndUpdate({
        id: userData.id,
        role: userData.role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return null;
});
exports.AuthServices = {
    registerUser,
    loginUser,
    refreshToken,
    changePasswordIntoDB
};
